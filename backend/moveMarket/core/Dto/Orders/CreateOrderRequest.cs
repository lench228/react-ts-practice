using core.Enums;

namespace core.Dto.Orders;

public record CreateOrderRequest(Guid CartKitId, OrderStatus Status, long Quantity);