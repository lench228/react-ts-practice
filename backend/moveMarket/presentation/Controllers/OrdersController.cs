using core.Dto.Orders;
using core.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using services.abstractions.Interfaces;

namespace presentation.Controllers;

[ApiController]
[Authorize]
[Route("api/users/orders")]
public class OrdersController(IOrdersService ordersService) : Controller
{
    [HttpGet("{orderId:guid}")]
    [ProducesResponseType<OrderResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetOrder(Guid orderId)
    {
        var response = await ordersService.GetOrder(User, orderId);
        return Ok(response);
    }
    
    [HttpGet]
    [ProducesResponseType<IEnumerable<OrderResponse>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GerUserOrders([FromQuery(Name="status")] OrderStatus? status)
    {
        var response = await ordersService.GetUserOrders(User, status);
        return Ok(response);
    }
    
    [HttpPost]
    [ProducesResponseType<CreateOrderResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
    {
        var response = await ordersService.CreateOrderAsync(User, request);
        return Ok(response);
    }
}