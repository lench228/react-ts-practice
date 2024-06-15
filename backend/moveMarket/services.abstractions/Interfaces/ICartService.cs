using System.Security.Claims;
using core.Dto.Cart;

namespace services.abstractions.Interfaces;

public interface ICartService
{
    Task<CartKitResponse> GetCartKitByIdAsync(ClaimsPrincipal userPrincipal, Guid cartKitId);
    Task<IEnumerable<CartKitResponse>> GetUserCartKitsAsync(ClaimsPrincipal userPrincipal);
    Task<IEnumerable<CartKitItemResponse>> GetCartKitItemsAsync(ClaimsPrincipal userPrincipal, Guid cartKitId);
    Task<AddToCartResponse> AddToCartAsync(ClaimsPrincipal userPrincipal, AddToCartRequest request);
    Task<UpdateCartKitResponse> UpdateCartKitAsync(ClaimsPrincipal userPrincipal, Guid cartKitId, UpdateCartKitRequest request);
}