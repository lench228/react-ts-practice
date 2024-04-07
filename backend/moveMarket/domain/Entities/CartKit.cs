using core.Entities.Base;

namespace domain.Entities;

public class CartKit : IEntity<Guid>
{
    public Guid Id { get; set; }
    
    public Guid CartId { get; set; }
    public Guid KitId { get; set; }
    public Cart Cart { get; set; } = null!;
    public Kit Kit { get; set; } = null!;
    public ICollection<CartKitItem> CartKitItems { get; set; } = null!;
}