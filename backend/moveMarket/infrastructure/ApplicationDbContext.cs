using domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace infrastructure;

internal class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public DbSet<Address> Addresses { get; set; } = null!;
    public DbSet<Cart> Carts { get; set; } = null!;
    public DbSet<CartKit> CartKits { get; set; } = null!;
    public DbSet<CartKitItem> CartKitItems { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Favorite> Favorites { get; set; } = null!;
    public DbSet<Kit> Kits { get; set; } = null!;
    public DbSet<Property> Properties { get; set; } = null!;
    public DbSet<KitItem> KitItems { get; set; } = null!;
    public DbSet<CartKitItemSelectedPropertyOption> CartKitItemSelectedPropertyOptions { get; set; } = null!;
    public DbSet<Item> Items { get; set; } = null!;
    public DbSet<ItemProperty> ItemProperties { get; set; } = null!;
    public DbSet<ItemPropertyOption> ItemPropertyOptions { get; set; } = null!;
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
        base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}