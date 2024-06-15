using System.Security.Claims;
using core.Dto.Orders;
using core.Enums;

namespace services.abstractions.Interfaces;

public interface IOrdersService
{
    Task<CreateOrderResponse> CreateOrderAsync(ClaimsPrincipal userPrincipal, CreateOrderRequest request);
    Task<OrderResponse> GetOrder(ClaimsPrincipal userPrincipal, Guid orderId);
    Task<IEnumerable<OrderResponse>> GetUserOrders(ClaimsPrincipal userPrincipal, OrderStatus? status);
}