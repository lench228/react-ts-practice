namespace core.Dto.User;

public record UserAddressResponse(Guid UserId, string Login, string? UserName, AddressResponse? Address)
{
    public UserAddressResponse() : this(Guid.Empty, string.Empty, string.Empty, null)
    {
    }
}