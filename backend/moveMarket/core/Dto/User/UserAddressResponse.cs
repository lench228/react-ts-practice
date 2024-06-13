namespace core.Dto.User;

public record UserAddressResponse(Guid UserId, string Login, string? UserName, string? AvatarId, AddressResponse? Address)
{
    public UserAddressResponse() : this(Guid.Empty, string.Empty, string.Empty, string.Empty, null)
    {
    }
}