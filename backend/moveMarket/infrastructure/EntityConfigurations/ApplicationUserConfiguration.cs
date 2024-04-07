using domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace infrastructure.EntityConfigurations;

internal sealed class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.Property(u => u.Email)
            .IsRequired();
        builder.Property(u => u.NormalizedEmail)
            .IsRequired();
        
        builder.HasIndex(u => u.NormalizedUserName).IsUnique(false);
        builder.HasIndex(u => u.NormalizedEmail).IsUnique();

        builder.HasOne(u => u.Address)
            .WithOne(a => a.User)
            .HasForeignKey<Address>(a => a.UserId)
            .IsRequired();
        
        builder.HasOne(u => u.Cart)
            .WithOne(a => a.User)
            .HasForeignKey<Cart>(a => a.UserId)
            .IsRequired();
        
        builder.ToTable("User");
    }
}