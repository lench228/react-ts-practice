using core.Dto.Items;

namespace core.Dto.Kits;

public record KitItemResponse(Guid KitId, long Quantity, ItemResponse Item);