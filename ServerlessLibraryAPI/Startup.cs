using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ServerlessLibrary.OAuth.GitHub;
using Swashbuckle.AspNetCore.Swagger;
using System.Threading.Tasks;

namespace ServerlessLibrary
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration  = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMemoryCache();

            services.AddAuthentication(options =>
            {
                options.DefaultChallengeScheme = GitHubAuthenticationDefaults.AuthenticationScheme;
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })
            .AddCookie()
            .AddOAuth<GitHubAuthenticationOptions, GitHubAuthenticationHandler>(
                GitHubAuthenticationDefaults.AuthenticationScheme,
                GitHubAuthenticationDefaults.DisplayName,
                options => {
                    options.ClientId = Configuration["Authentication:GitHub:ClientId"]; // these settings need to be present in appSettings (or in secrets.json)
                    options.ClientSecret = Configuration["Authentication:GitHub:ClientSecret"];
                });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "ASP.NET Core 2.0 Web API",
                    Version = "v1"
                });
            });

            services.AddSingleton<ICacheService, CacheService>();
            services.AddSingleton<ILibraryStore, CosmosLibraryStore>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory logger)
        {
            app.UseExceptionHandler(a => {
                a.Run(ctx => {
                    ctx.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    return Task.CompletedTask;
                });
            });
            app.UseStatusCodePages();
            app.UseHsts();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Serverless library API v1");
                c.RoutePrefix = "swagger";
            });

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            if (!ServerlessLibrarySettings.ApiOnly)
            {
                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp";

                    if (env.IsDevelopment())
                    {
                        spa.UseReactDevelopmentServer(npmScript: "start");
                    }
                });
            }

            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add("X-Frame-Options", "SAMEORIGIN");
                context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
                context.Response.Headers.Add("Strict-Transport-Security", "max-age=600; includeSubDomains; preload");
                context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
                await next();
            });
        }
    }
}
