using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.ApplicationInsights;

namespace ServerlessLibrary
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseApplicationInsights()
                .UseStartup<Startup>()
                .ConfigureLogging(
                    builder =>
                    {
                        builder.AddApplicationInsights();
                        builder.AddFilter<ApplicationInsightsLoggerProvider>("ServerlessLibrary.Program", LogLevel.Information);
                        builder.AddFilter<ApplicationInsightsLoggerProvider>("ServerlessLibrary.Startup", LogLevel.Information);
                        builder.AddFilter<ApplicationInsightsLoggerProvider>("", LogLevel.Information);
                    }
                );
    }
}
