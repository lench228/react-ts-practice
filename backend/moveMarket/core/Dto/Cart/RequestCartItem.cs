namespace core.Dto.Cart;

public record RequestCartItem(Guid ItemId, long Quantity, IEnumerable<RequestCartProperty> Properties);