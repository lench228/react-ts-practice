using System.Security.Claims;
using core.Dto.Orders;
using core.Enums;
using core.Extensions;
using domain.Entities;
using domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using services.abstractions.Interfaces;
using services.Exceptions.Cart;
using services.Exceptions.Orders;
using services.Exceptions.User;

namespace services.Implementations;

internal class OrdersService(IRepository<Order> ordersRepo,
    IRepository<ApplicationUser> usersRepo,
    IRepository<CartKit> cartKitsRepo,
    IUnitOfWork unitOfWork) : IOrdersService
{
    public async Task<CreateOrderResponse> CreateOrderAsync(ClaimsPrincipal userPrincipal, CreateOrderRequest request)
    {
        if (!userPrincipal.TryGetUserId(out var userId))
            throw new InvalidOperationException("no claim in authorized user principal");
        var user = await usersRepo.GetByIdAsync(userId) ?? throw new UserNotFoundException(userId);
        var cartKit = await cartKitsRepo.Query()
                          .Include(c => c.Cart)
                          .Include(ck => ck.CartKitItems)
                          .ThenInclude(cki => cki.KitItem)
                          .ThenInclude(ki => ki.Item)
                          .Include(ck => ck.Kit)
                          .SingleOrDefaultAsync(ck => ck.Id == request.CartKitId) ??
                      throw new CartKitNotFoundException(request.CartKitId);
        if (cartKit.Cart.UserId != user.Id)
            throw new CartKitActionForbiddenException(cartKit.Id);
        var price = cartKit.CartKitItems.Select(cki => cki.KitItem.Item.Price * cki.Quantity).Sum() *
                    (1 - cartKit.Kit.Discount);
        var order = new Order
        {
            UserId = userId,
            CartKitId = request.CartKitId,
            Status = request.Status,
            Quantity = request.Quantity,
            Price = price
        };
        await ordersRepo.CreateAsync(order);
        await unitOfWork.SaveChangesAsync();
        return new CreateOrderResponse(order.Id, order.UserId, order.CartKitId, order.Status, order.Quantity,
            order.Price);
    }

    public async Task<OrderResponse> GetOrder(ClaimsPrincipal userPrincipal, Guid orderId)
    {
        if (!userPrincipal.TryGetUserId(out var userId))
            throw new InvalidOperationException("no claim in authorized user principal");
        var user = await usersRepo.GetByIdAsync(userId) ?? throw new UserNotFoundException(userId);
        var order = await ordersRepo.GetByIdAsync(orderId);
        if (order == null)
            throw new OrderNotFoundException(orderId);
        if (user.Id != order.UserId)
            throw new OrderActionForbiddenException(orderId);
        return new OrderResponse(order.Id, order.UserId, order.CartKitId, order.Status, order.Quantity,
            order.Price);
    }

    public async Task<IEnumerable<OrderResponse>> GetUserOrders(ClaimsPrincipal userPrincipal, OrderStatus? status)
    {
        if (!userPrincipal.TryGetUserId(out var userId))
            throw new InvalidOperationException("no claim in authorized user principal");
        var user = await usersRepo.GetByIdAsync(userId) ?? throw new UserNotFoundException(userId);
        var orders = await ordersRepo.Query()
            .Where(o => o.UserId == user.Id && (status == null || o.Status == status))
            .ToListAsync();
        return orders.Select(order => new OrderResponse(order.Id,
            order.UserId,
            order.CartKitId,
            order.Status,
            order.Quantity,
            order.Price));
    }
}