using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AdminService
{
    using BusinessLogic.Configurations;

    using FluentValidation.AspNetCore;

    using Microsoft.AspNetCore.Cors.Infrastructure;
    using Microsoft.AspNetCore.Mvc.Versioning;

    using Swashbuckle.AspNetCore.Swagger;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().AddFluentValidation(
                fv =>
                    {
                        fv.RegisterValidatorsFromAssembly(
                            AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(
                                assembly => assembly.FullName.Contains("BusinessLogic")));
                    }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddCors(options =>
                {
                    var corsBuilder = new CorsPolicyBuilder();
                    corsBuilder.AllowAnyHeader();
                    corsBuilder.AllowAnyMethod();
                    corsBuilder.AllowAnyOrigin();
                    corsBuilder.AllowCredentials();
                    options.AddPolicy("SiteCorsPolicy", corsBuilder.Build());
                });

            services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new Info { Title = "Authentication API", Version = "v1" });
                });

            services.AddBusinessLogic(Configuration.GetConnectionString("LicenseProject"));
            services.AddApiVersioning(o => o.ApiVersionReader = new HeaderApiVersionReader("api-version"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
