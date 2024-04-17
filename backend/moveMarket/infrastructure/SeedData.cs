using domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace infrastructure;

public static class SeedData
{
    public static async Task EnsureUsersCreated(IEnumerable<(string email, string password)> users,
        IServiceProvider serviceProvider)
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        foreach (var user in users)
        {
            var exists = await userManager.Users
                .SingleOrDefaultAsync(u => u.Email == user.email);
            if (exists is not null)
                continue;
            var newUser = new ApplicationUser
            {
                Email = user.email,
                UserName = user.email
            };
            await userManager.CreateAsync(newUser, user.password);
        }
    }
}