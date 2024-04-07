using core.Entities.Base;

namespace domain.Entities;

public class Kit : IEntity<Guid>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public double Discount { get; set; }
    public long Popularity { get; set; }
    public string? ImagePath { get; set; }
    
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}