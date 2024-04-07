using domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace infrastructure.EntityConfigurations;

internal sealed class ItemPropertyConfiguration : IEntityTypeConfiguration<ItemProperty>
{
    public void Configure(EntityTypeBuilder<ItemProperty> builder)
    {
        builder.HasIndex(ki => new { ki.PropertyId, ki.ItemId })
            .IsUnique();

        builder.ToTable("ItemProperty");
    }
}