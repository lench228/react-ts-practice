using core.Entities.Base;

namespace domain.Entities;

public class Property : IEntity<Guid>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string? NormalizedName { get; set; } = null!;
    
    public ICollection<ItemProperty> ItemProperties { get; set; } = null!;
}