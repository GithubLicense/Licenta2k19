using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations.Entities
{
    public class TeamConfiguration : BaseEntityConfiguration, IEntityTypeConfiguration<Team>
    {
        public new void Configure(EntityTypeBuilder<Team> builder)
        {
            base.Configure(builder);

            builder.Property(p => p.GithubRepository)
                .IsRequired();

            builder.Property(p => p.GithubUsername)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(p => p.ProjectId)
                .IsRequired();

            builder.HasOne(p => p.Project).WithMany().HasForeignKey(p => p.ProjectId);
        }
    }
}
