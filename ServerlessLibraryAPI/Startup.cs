using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;

namespace ServerlessLibrary
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMemoryCache();
            services.AddMvc();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "ASP.NET Core 2.0 Web API",
                    Version = "v1"
                });
            });
            //#region snippet_ConfigureApiBehaviorOptions
            //services.Configure<ApiBehaviorOptions>(options =>
            //{
            //    options.SuppressConsumesConstraintForFormFileParameters = true;
            //    options.SuppressInferBindingSourcesForParameters = true;
            //    options.SuppressModelStateInvalidFilter = true;
            //});
            //#endregion
            services.AddSingleton<ICacheService, CacheService>();
            services.AddSingleton<ILibraryStore, CosmosLibraryStore>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            var logger = loggerFactory.CreateLogger<Startup>();

            // rewrite URL to support SPA routing
            app.Use(async (context, next) =>
            {
                await next();
                var path = context.Request.Path.Value;
                if (!path.StartsWith("/api") && !Path.HasExtension(path))
                {
                    logger.LogInformation($"Original request path: '{path}'. Rewriting to: '/'");
                    context.Request.Path = "/";
                    await next();
                }
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Serverless library API v1");
                c.RoutePrefix = "swagger";
            });
            app.UseMvc();
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
