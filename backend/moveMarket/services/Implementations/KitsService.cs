using AutoMapper;
using core.Dto.Items;
using core.Dto.Kits;
using core.Dto.Properties;
using domain.Entities;
using domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using services.abstractions.Interfaces;
using services.Exceptions.Kits;

namespace services.Implementations;

internal class KitsService(IRepository<Kit> kitsRepo, IMapper mapper) : IKitsService
{
    public async Task<KitResponse> GetKitByIdAsync(Guid kitId)
    {
        var kit = await kitsRepo.Query()
            .Include(k => k.Category)
            .SingleOrDefaultAsync(k => k.Id == kitId);
        if (kit == null)
            throw new KitNotFoundException(kitId);
        return mapper.Map<KitResponse>(kit);
    }

    public async Task<IEnumerable<KitItemResponse>> GetKitItemsAsync(Guid kitId)
    {
        var kit = await kitsRepo.Query()
            .Include(k => k.KitItems)
            .ThenInclude(ki => ki.Item)
            .ThenInclude(i => i.ItemProperties)
            .ThenInclude(ip => ip.Options)
            .Include(k => k.KitItems)
            .ThenInclude(ki => ki.Item)
            .ThenInclude(i => i.ItemProperties)
            .ThenInclude(ip => ip.Property)
            .SingleOrDefaultAsync(k => k.Id == kitId);
        if (kit == null)
            throw new KitNotFoundException(kitId);
        return kit.KitItems.Select(ki => new KitItemResponse(kit.Id, ki.Quantity,
            new ItemResponse(ki.Item.Id, ki.Item.Name, ki.Item.Description,
                Path.GetFileNameWithoutExtension(ki.Item.ImagePath), ki.Item.Price,
                ki.Item.ItemProperties.Select(ip => new ItemPropertyResponse(ki.Item.Id,
                    new PropertyResponse(ip.PropertyId, ip.Property.Name),
                    ip.Options.Select(o => new OptionResponse(o.Id, o.Value,
                        Path.GetFileNameWithoutExtension(o.RelatedImagePath),
                        o.PriceMultiplier,
                        o.IsAvailable,
                        o.IsDefault)))))));
    }
}