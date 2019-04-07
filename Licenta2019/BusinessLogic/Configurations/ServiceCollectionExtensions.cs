namespace BusinessLogic.Configurations
{
    using BusinessLogic.Abstractions;
    using BusinessLogic.Implementations;

    using DataAccess.Configurations;

    using Microsoft.Extensions.DependencyInjection;

    public static class ServiceCollectionExtensions
    {
        public static void AddBusinessLogic(this IServiceCollection services, string connectionString)
        {
            services.AddDataAccess(connectionString);
            services.AddScoped<IUserLogic, UserLogic>();
            services.AddScoped<ICourseLogic, CourseLogic>();
            services.AddScoped<ICourseManagementLogic, CourseManagementLogic>();
            services.AddScoped<IProjectLogic, ProjectLogic>();
        }
    }
}
