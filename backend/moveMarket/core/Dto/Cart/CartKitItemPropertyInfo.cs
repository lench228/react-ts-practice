using core.Dto.Properties;

namespace core.Dto.Cart;

public record CartKitItemPropertyInfo(Guid ItemId,
    PropertyResponse Property,
    Guid? SelectedOptionId,
    IEnumerable<OptionResponse> Options);