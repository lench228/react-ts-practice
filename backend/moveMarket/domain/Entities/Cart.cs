using core.Entities.Base;

namespace domain.Entities;

public class Cart : IEntity<Guid>
{
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;
    public ICollection<CartKit> CartKits { get; set; } = null!;
}