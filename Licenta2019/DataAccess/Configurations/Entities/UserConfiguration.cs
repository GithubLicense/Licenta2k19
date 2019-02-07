using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Configurations.Entities
{
    using global::Entities;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class UserConfiguration : BaseEntityConfiguration, IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);

            builder.Property(p => p.FirstName)
                .IsRequired()
                .HasMaxLength(25);

            builder.Property(p => p.LastName)
                .IsRequired()
                .HasMaxLength(25);

            builder.Property(p => p.Email)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(p => p.PasswordHash)
                .IsRequired();

            builder.Property(p => p.PasswordSalt)
                .IsRequired();
        }
    }
}
