namespace core.Dto.Properties;

public record OptionResponse(Guid OptionId,
    string Value,
    string? ImageId,
    double PriceMultiplier,
    bool IsAvailable,
    bool IsDefault);