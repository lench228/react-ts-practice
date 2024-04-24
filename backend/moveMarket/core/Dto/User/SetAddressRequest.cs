namespace core.Dto.User;

public record SetAddressRequest(string? City, string? Street, string? Building, int? Apartment);