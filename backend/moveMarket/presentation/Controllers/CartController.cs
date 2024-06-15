using core.Dto.Cart;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using services.abstractions.Interfaces;

namespace presentation.Controllers;

[ApiController]
[Authorize]
[Route("api/cart/kits")]
public class CartController(ICartService cartService) : Controller
{
    [HttpGet("{kitId:guid}")]
    [ProducesResponseType<CartKitResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCartKit(Guid kitId)
    {
        var response = await cartService.GetCartKitByIdAsync(User, kitId);
        return Ok(response);
    }
    
    [HttpGet]
    [ProducesResponseType<IEnumerable<CartKitResponse>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetUserCartKits()
    {
        var response = await cartService.GetUserCartKitsAsync(User);
        return Ok(response);
    }
    
    [HttpGet("{kitId:guid}/items")]
    [ProducesResponseType<IEnumerable<CartKitItemResponse>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCartKitItems(Guid kitId)
    {
        var response = await cartService.GetCartKitItemsAsync(User, kitId);
        return Ok(response);
    }
    
    [HttpPost]
    [ProducesResponseType<AddToCartResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> AddToCart(AddToCartRequest request)
    {
        var response = await cartService.AddToCartAsync(User, request);
        return Ok(response);
    }
    
    [HttpPost("{kitId:guid}")]
    [ProducesResponseType<UpdateCartKitResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateCartKit(Guid kitId, UpdateCartKitRequest request)
    {
        var response = await cartService.UpdateCartKitAsync(User, kitId, request);
        return Ok(response);
    }
}