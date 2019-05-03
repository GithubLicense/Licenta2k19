using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations.Entities
{
    public class EvaluationConfiguration : BaseEntityConfiguration, IEntityTypeConfiguration<Evaluation>
    {
        public new void Configure(EntityTypeBuilder<Evaluation> builder)
        {
            base.Configure(builder);

            builder.Property(p => p.Type)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(p => p.Grade)
                .IsRequired()
                .HasMaxLength(2);

            builder.Property(p => p.Description)
                .IsRequired();

            builder.HasOne(p => p.Team).WithMany().HasForeignKey(p => p.TeamId);
        }
    }
}
