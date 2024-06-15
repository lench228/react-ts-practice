using core.Dto.Categories;
using core.Dto.Kits;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using services.abstractions.Interfaces;

namespace presentation.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoriesController(ICategoriesService catsService) : Controller
{
    [HttpGet]
    [ProducesResponseType<IEnumerable<CategoryResponse>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCategories()
    {
        var response = await catsService.GetCategoriesAsync();
        return Ok(response);
    }
    
    [HttpGet("{categoryId:guid}/kits")]
    [ProducesResponseType<KitResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetKitItems(Guid categoryId)
    {
        var response = await catsService.GetCategoryKits(categoryId);
        return Ok(response);
    }
}