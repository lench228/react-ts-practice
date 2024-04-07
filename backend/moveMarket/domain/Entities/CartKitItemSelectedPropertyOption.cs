using core.Entities.Base;

namespace domain.Entities;

public class CartKitItemSelectedPropertyOption : IEntity<Guid>
{
    public Guid Id { get; set; }
    
    public Guid CartKitItemId { get; set; }
    public Guid ItemPropertyId { get; set; }
    public Guid ItemPropertyOptionId { get; set; }

    public CartKitItem CartKitItem { get; set; } = null!;
    public ItemProperty ItemProperty { get; set; } = null!;
    public ItemPropertyOption ItemPropertyOption { get; set; } = null!;
}