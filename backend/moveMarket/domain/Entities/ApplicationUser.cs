using core.Entities.Base;
using Microsoft.AspNetCore.Identity;

namespace domain.Entities;

public class ApplicationUser : IdentityUser<Guid>, IEntity<Guid>
{
    public string? AvatarPath { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryDate { get; set; }
    public string? DisplayName { get; set; }
    
    public Address? Address { get; set; }
    public Cart? Cart { get; set; }
    public ICollection<Favorite> Favorites { get; set; } = null!;
}