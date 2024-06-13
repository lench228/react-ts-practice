using System.Security.Claims;
using core.Dto.Auth;
using core.Dto.User;

namespace services.abstractions.Interfaces;

public interface IUserService
{
    Task<UserResponse> GetByEmailAsync(string email);
    Task<UserAddressResponse> GetByIdAsync(Guid id);
    Task<CreateUserResponse> CreateUserAsync(CreateUserRequest request);
    Task<UserAddressResponse> UpdateUserAsync(ClaimsPrincipal userPrincipal, UpdateUserRequest request);
    Task ChangePasswordAsync(ClaimsPrincipal userPrincipal, ChangePasswordRequest request);
    Task<UserAddressResponse> SetAddressAsync(ClaimsPrincipal userPrincipal, SetAddressRequest request);
    Task<LoginResponse> LoginAsync(LoginRequest request);
    Task RevokeTokenAsync(ClaimsPrincipal userPrincipal);
    Task<RefreshTokenResponse> RefreshTokenAsync(RefreshTokenRequest request);
}