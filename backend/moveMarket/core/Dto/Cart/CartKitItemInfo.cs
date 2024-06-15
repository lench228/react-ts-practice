namespace core.Dto.Cart;

public record CartKitItemInfo(Guid ItemId,
    string Name,
    string? Description,
    string? ImageId,
    double Price,
    IEnumerable<CartKitItemPropertyInfo> Properties);