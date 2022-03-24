using Kumojin.Backend.Application.Events;
using Kumojin.Backend.Infrastructure.KumojinEvents;
using Microsoft.Extensions.DependencyInjection;

namespace Kumojin.Backend.Web.StartupExtensions
{
    public static class DependencyInjectionStartupExtensions
    {
        public static IServiceCollection AddKumojinEventServices(this IServiceCollection services)
        {
            // Application services
            services.AddScoped<IKumojinEventService, KumojinEventService>();
            
            // Infrastructure services
            services.AddScoped<IKumojinEventRepository, KumojinEventRepository>();

            return services;
        }
    }
}