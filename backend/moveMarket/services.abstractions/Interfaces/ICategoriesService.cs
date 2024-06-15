using core.Dto.Categories;
using core.Dto.Kits;

namespace services.abstractions.Interfaces;

public interface ICategoriesService
{
    Task<IEnumerable<CategoryResponse>> GetCategoriesAsync();
    Task<IEnumerable<KitResponse>> GetCategoryKits(Guid categoryId);
}