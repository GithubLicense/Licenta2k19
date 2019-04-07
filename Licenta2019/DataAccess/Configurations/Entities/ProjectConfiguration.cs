using System;
using System.Collections.Generic;
using System.Text;
using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations.Entities
{
    public class ProjectConfiguration : BaseEntityConfiguration, IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            base.Configure(builder);

            builder.Property(p => p.Code)
                .IsRequired()
                .HasMaxLength(3);

            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(p => p.NumberOfMembers)
                .IsRequired()
                .HasMaxLength(2);

            builder.Property(p => p.NumberOfTeams)
                .IsRequired()
                .HasMaxLength(2);

            builder.Property(p => p.MaxGrade)
                .IsRequired()
                .HasMaxLength(2);

            builder.Property(p => p.Description)
                .IsRequired();

            builder.Property(p => p.CourseId)
                .IsRequired();
        }
    }
}
