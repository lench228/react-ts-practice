using core.Dto.Kits;

namespace core.Dto.Cart;

public record CartKitResponse(Guid CartKitId,
    Guid UserId,
    KitResponse Kit);