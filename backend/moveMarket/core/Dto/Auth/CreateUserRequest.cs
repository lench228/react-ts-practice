namespace core.Dto.Auth;

public record CreateUserRequest(string Login, string? UserName, string Password);