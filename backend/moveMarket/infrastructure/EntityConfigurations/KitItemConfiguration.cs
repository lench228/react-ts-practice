using domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace infrastructure.EntityConfigurations;

internal sealed class KitItemConfiguration : IEntityTypeConfiguration<KitItem>
{
    public void Configure(EntityTypeBuilder<KitItem> builder)
    {
        builder.HasIndex(ki => new { ki.KitId, ki.ItemId })
            .IsUnique();

        builder.ToTable("KitItem");
    }
}