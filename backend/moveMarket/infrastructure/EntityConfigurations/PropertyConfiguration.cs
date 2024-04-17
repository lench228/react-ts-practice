using domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace infrastructure.EntityConfigurations;

internal sealed class PropertyConfiguration : IEntityTypeConfiguration<Property>
{
    public void Configure(EntityTypeBuilder<Property> builder)
    {
        builder.ToTable("Property");
        
        builder.HasIndex(e => e.NormalizedName)
            .IsUnique();

        builder.Property(e => e.NormalizedName)
            .HasComputedColumnSql("UPPER(\"Name\")", true);
    }
}