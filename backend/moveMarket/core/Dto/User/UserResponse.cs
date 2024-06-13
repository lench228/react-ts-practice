namespace core.Dto.User;

public record UserResponse(Guid UserId, string Login, string? UserName, string? AvatarId)
{
    public UserResponse() : this(Guid.Empty, string.Empty, string.Empty, string.Empty)
    {
    }
}