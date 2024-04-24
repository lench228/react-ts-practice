namespace core.Dto.User;

public record ChangePasswordRequest(string OldPassword, string NewPassword);