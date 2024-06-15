namespace core.Dto.Cart;

public record UpdateCartKitRequest(IEnumerable<RequestCartItem> Items);