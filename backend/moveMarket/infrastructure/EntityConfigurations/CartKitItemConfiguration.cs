using domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace infrastructure.EntityConfigurations;

internal sealed class CartKitItemConfiguration : IEntityTypeConfiguration<CartKitItem>
{
    public void Configure(EntityTypeBuilder<CartKitItem> builder)
    {
        builder.HasIndex(ki => new { ki.KitItemId, ki.CartKitId })
            .IsUnique();

        builder.ToTable("CartKitItem");
    }
}