namespace core.Dto.Properties;

public record ItemPropertyResponse(Guid ItemId,
    PropertyResponse Property,
    IEnumerable<OptionResponse> Options);