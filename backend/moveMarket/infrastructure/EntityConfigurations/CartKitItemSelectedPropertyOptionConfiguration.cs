using domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace infrastructure.EntityConfigurations;

internal sealed class CartKitItemSelectedPropertyOptionConfiguration :
    IEntityTypeConfiguration<CartKitItemSelectedPropertyOption>
{
    public void Configure(EntityTypeBuilder<CartKitItemSelectedPropertyOption> builder)
    {
        builder.HasIndex(e => new { e.CartKitItemId, e.ItemPropertyId })
            .IsUnique();

        builder.ToTable("CartKitItemSelectedPropertyOption");
    }
}