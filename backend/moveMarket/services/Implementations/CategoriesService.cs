using AutoMapper;
using core.Dto.Categories;
using core.Dto.Kits;
using domain.Entities;
using domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using services.abstractions.Interfaces;
using services.Exceptions.Categories;

namespace services.Implementations;

internal class CategoriesService(IRepository<Category> categoryRepo, IMapper mapper) : ICategoriesService
{
    public async Task<IEnumerable<CategoryResponse>> GetCategoriesAsync()
    {
        var cats = await categoryRepo.Query().ToListAsync();
        return mapper.Map<IEnumerable<CategoryResponse>>(cats);
    }

    public async Task<IEnumerable<KitResponse>> GetCategoryKits(Guid categoryId)
    {
        var cat = await categoryRepo.Query()
            .AsNoTracking()
            .Include(c => c.Kits)
            .SingleOrDefaultAsync(c => c.Id == categoryId);
        if (cat == null)
            throw new CategoryNotFoundException(categoryId);
        return mapper.Map<IEnumerable<KitResponse>>(cat.Kits);
    }
}