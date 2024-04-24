namespace core.Dto.User;

public record UserResponse(Guid UserId, string Login, string? UserName)
{
    public UserResponse() : this(Guid.Empty, string.Empty, string.Empty)
    {
    }
}