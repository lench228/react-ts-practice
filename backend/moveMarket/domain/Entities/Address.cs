using core.Entities.Base;

namespace domain.Entities;

public class Address : IEntity<Guid>
{
    public Guid Id { get; set; }
    public string? City { get; set; }
    public string? Street { get; set; }
    public string? Building { get; set; }
    public int? Apartment { get; set; }
    
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;
}