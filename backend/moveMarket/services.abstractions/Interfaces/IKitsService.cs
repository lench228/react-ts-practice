using core.Dto.Kits;

namespace services.abstractions.Interfaces;

public interface IKitsService
{
    Task<KitResponse> GetKitByIdAsync(Guid kitId);
    Task<IEnumerable<KitItemResponse>> GetKitItemsAsync(Guid kitId);
}