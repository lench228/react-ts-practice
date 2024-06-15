namespace core.Dto.Cart;

public record AddToCartRequest(Guid KitId, IEnumerable<RequestCartItem> Items);