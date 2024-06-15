namespace core.Dto.Cart;

public record AddToCartResponse(Guid CartKitId, Guid UserId, Guid KitId);