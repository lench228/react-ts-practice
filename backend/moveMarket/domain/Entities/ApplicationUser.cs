using core.Entities.Base;
using Microsoft.AspNetCore.Identity;

namespace domain.Entities;

public class ApplicationUser : IdentityUser<Guid>, IEntity<Guid>
{
    public string? AvatarPath { get; set; }
    public string? RefreshToken { get; set; }
}