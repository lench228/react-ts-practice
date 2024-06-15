using core.Enums;

namespace core.Dto.Orders;

public record CreateOrderResponse(Guid OrderId, Guid UserId, Guid CartKitId, OrderStatus Status, long Quantity, double Price);