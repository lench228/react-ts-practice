using core.Dto.Categories;

namespace core.Dto.Kits;

public record KitResponse(Guid KitId,
    string Name,
    string Description,
    double Discount,
    long Popularity,
    string? ImageId,
    CategoryResponse Category)
{
    public KitResponse() : this(Guid.Empty, string.Empty, string.Empty, 0, 0, string.Empty, null)
    {
    }
}