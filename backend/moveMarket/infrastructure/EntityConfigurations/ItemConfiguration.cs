using domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace infrastructure.EntityConfigurations;

internal sealed class ItemConfiguration : IEntityTypeConfiguration<Item>
{
    public void Configure(EntityTypeBuilder<Item> builder)
    {
        builder.ToTable("Item");
        
        builder.HasIndex(e => e.NormalizedName)
            .IsUnique();

        builder.Property(e => e.NormalizedName)
            .HasComputedColumnSql("UPPER(\"Name\")", true);
    }
}