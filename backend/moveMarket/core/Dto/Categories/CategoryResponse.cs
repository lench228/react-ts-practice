namespace core.Dto.Categories;

public record CategoryResponse(Guid CategoryId, string Name)
{
    public CategoryResponse() : this(Guid.Empty, string.Empty)
    {
    }
}