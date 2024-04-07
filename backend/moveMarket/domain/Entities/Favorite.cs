using core.Entities.Base;

namespace domain.Entities;

public class Favorite : IEntity<Guid>
{
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    public Guid KitId { get; set; }
    public ApplicationUser User { get; set; } = null!;
    public Kit Kit { get; set; } = null!;
}