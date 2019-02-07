using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Configurations
{
    using DataAccess.Abstractions;
    using DataAccess.Implementations;

    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.EntityFrameworkCore;

    public static class ServiceCollectionExtensios
    {
        public static void AddDataAccess(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));
            services.AddScoped<IRepository, Repository>();
        }
    }
}
