using core.Entities.Base;

namespace domain.Entities;

public class CartKitItem : IEntity<Guid>
{
    public Guid Id { get; set; }
    public long Quantity { get; set; } = 1;
    
    public Guid KitItemId { get; set; }
    public Guid CartKitId { get; set; }
    public KitItem KitItem { get; set; } = null!;
    public CartKit CartKit { get; set; } = null!;
}