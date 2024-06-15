using core.Dto.Properties;

namespace core.Dto.Items;

public record ItemResponse(Guid ItemId,
    string Name,
    string? Description,
    string? ImageId,
    double Price,
    IEnumerable<ItemPropertyResponse> Properties);