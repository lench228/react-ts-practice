using core.Entities.Base;

namespace domain.Entities;

public class ItemPropertyOption : IEntity<Guid>
{
    public Guid Id { get; set; }
    public string Value { get; set; } = null!;
    public double PriceMultiplier { get; set; } = 1;
    public bool IsAvailable { get; set; }
    public bool IsDefault { get; set; }
    public string? RelatedImagePath { get; set; }

    public Guid ItemPropertyId { get; set; }
    public ItemProperty ItemProperty { get; set; } = null!;
}