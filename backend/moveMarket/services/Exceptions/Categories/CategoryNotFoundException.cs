using core.Exceptions.Base;

namespace services.Exceptions.Categories;

public class CategoryNotFoundException : NotFoundException
{
    public CategoryNotFoundException(Guid categoryId) : base("Category not found")
    {
        ExceptionObject = categoryId;
    }
}