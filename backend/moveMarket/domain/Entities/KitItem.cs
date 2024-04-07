using core.Entities.Base;

namespace domain.Entities;

public class KitItem : IEntity<Guid>
{
    public Guid Id { get; set; }
    public long Quantity { get; set; } = 1;
    
    public Guid ItemId { get; set; }
    public Guid KitId { get; set; }
    public Item Item { get; set; } = null!;
    public Kit Kit { get; set; } = null!;
}