namespace core.Dto.User;

public record AddToFavoritesResponse(Guid FavoriteId, Guid UserId, Guid KitId);