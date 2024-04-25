namespace core.Exceptions.Base;

public abstract class UnauthorizedException(string message) : BaseResponseException(message);
