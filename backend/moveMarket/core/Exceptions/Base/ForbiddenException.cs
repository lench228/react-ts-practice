namespace core.Exceptions.Base;

public abstract class ForbiddenException(string message) : BaseResponseException(message);