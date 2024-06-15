using core.Dto.Kits;

namespace core.Dto.Cart;

public record CartKitItemResponse(Guid CartKitId, CartKitItemKitInfo CartKitItem);