namespace core.Dto.User;

public record AddressResponse(Guid AddressId, string? City, string? Street, string? Building, int? Apartment)
{
    public AddressResponse() : this(Guid.Empty, string.Empty, string.Empty, string.Empty, null)
    {
    }
}