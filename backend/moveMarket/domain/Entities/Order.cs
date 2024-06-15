using core.Entities.Base;
using core.Enums;

namespace domain.Entities;

public class Order : IEntity<Guid>
{
    public Guid Id { get; set; }
    public OrderStatus Status { get; set; }
    public long Quantity { get; set; }
    public double Price { get; set; }
    
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;
    public Guid CartKitId { get; set; }
    public CartKit CartKit { get; set; } = null!;
}