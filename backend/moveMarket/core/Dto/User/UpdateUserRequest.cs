using Microsoft.AspNetCore.Http;

namespace core.Dto.User;

public record UpdateUserRequest(string? UserName, IFormFile? AvatarImage);