using core.Dto.Kits;

namespace core.Dto.User;

public record UserFavoriteResponse(Guid UserId, KitResponse FavoriteKit);