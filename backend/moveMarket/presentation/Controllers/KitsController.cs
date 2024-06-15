using core.Dto.Kits;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using services.abstractions.Interfaces;

namespace presentation.Controllers;

[ApiController]
[Route("api/kits/{kitId:guid}")]
public class KitsController(IKitsService kitsService) : Controller
{
    [HttpGet]
    [ProducesResponseType<KitResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetKit(Guid kitId)
    {
        var response = await kitsService.GetKitByIdAsync(kitId);
        return Ok(response);
    }
    
    [HttpGet("items")]
    [ProducesResponseType<KitResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetKitItems(Guid kitId)
    {
        var response = await kitsService.GetKitItemsAsync(kitId);
        return Ok(response);
    }
}