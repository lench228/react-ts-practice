using core.Entities.Base;

namespace domain.Entities;

public class ItemProperty : IEntity<Guid>
{
    public Guid Id { get; set; }
    
    public Guid ItemId { get; set; }
    public Guid PropertyId { get; set; }
    public Item Item { get; set; } = null!;
    public Property Property { get; set; } = null!;
    public ICollection<ItemPropertyOption> Options { get; set; } = null!;
}