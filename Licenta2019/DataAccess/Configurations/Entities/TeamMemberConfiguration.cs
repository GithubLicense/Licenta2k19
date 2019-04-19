using System;
using System.Collections.Generic;
using System.Text;
using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations.Entities
{
    public class TeamMemberConfiguration : BaseEntityConfiguration, IEntityTypeConfiguration<TeamMember>
    {
        public new void Configure(EntityTypeBuilder<TeamMember> builder)
        {
            base.Configure(builder);

            builder.Property(p => p.TeamId)
                .IsRequired();

            builder.Property(p => p.MemberId)
                .IsRequired();

            builder.HasOne(p => p.Team).WithMany().HasForeignKey(p => p.TeamId);
        }
    }
}
