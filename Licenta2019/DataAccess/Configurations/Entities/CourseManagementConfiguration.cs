using System;
using System.Collections.Generic;
using System.Text;
using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations.Entities
{
    public class CourseManagementConfiguration: BaseEntityConfiguration, IEntityTypeConfiguration<CourseManagement>
    {
        public void Configure(EntityTypeBuilder<CourseManagement> builder)
        {
            base.Configure(builder);

            builder.Property(r => r.UserId)
                .IsRequired();

            builder.HasOne(p => p.Course).WithMany().HasForeignKey(p => p.CourseId);
        }
    }
}
