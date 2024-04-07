using domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace infrastructure.EntityConfigurations;

internal sealed class CartKitConfiguration : IEntityTypeConfiguration<CartKit>
{
    public void Configure(EntityTypeBuilder<CartKit> builder)
    {
        builder.HasIndex(ki => new { ki.KitId, ki.CartId })
            .IsUnique();

        builder.ToTable("CartKit");
    }
}