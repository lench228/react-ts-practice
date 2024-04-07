using domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace infrastructure.EntityConfigurations;

internal sealed class ItemPropertyOptionConfiguration : IEntityTypeConfiguration<ItemPropertyOption>
{
    public void Configure(EntityTypeBuilder<ItemPropertyOption> builder)
    {
        builder.HasIndex(e => e.IsDefault)
            .HasFilter("\"IsDefault\" = true")
            .IsUnique();

        builder.ToTable("ItemPropertyOption");
    }
}