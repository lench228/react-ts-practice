using System.Security.Claims;
using AutoMapper;
using core.Dto.Cart;
using core.Dto.Kits;
using core.Dto.Properties;
using core.Extensions;
using domain.Entities;
using domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using services.abstractions.Interfaces;
using services.Exceptions.Cart;
using services.Exceptions.Kits;
using services.Exceptions.Properties;
using services.Exceptions.User;

namespace services.Implementations;

internal class CartService(IRepository<CartKit> cartKitsRepo,
    IRepository<ApplicationUser> usersRepo,
    IRepository<Cart> cartsRepo,
    IRepository<Kit> kitsRepo,
    IRepository<CartKitItem> cartKitItemsRepo,
    IUnitOfWork unitOfWork,
    IMapper mapper) : ICartService
{
    public async Task<CartKitResponse> GetCartKitByIdAsync(ClaimsPrincipal userPrincipal, Guid cartKitId)
    {
        if (!userPrincipal.TryGetUserId(out var userId))
            throw new InvalidOperationException("no claim in authorized user principal");
        var user = await usersRepo.GetByIdAsync(userId)
                   ?? throw new UserNotFoundException(userId);
        var cartKit = await cartKitsRepo.Query()
                          .AsNoTracking()
                          .Include(c => c.Cart)
                          .Include(c => c.Kit)
                          .ThenInclude(k => k.Category)
                          .SingleOrDefaultAsync(c => c.Id == cartKitId)
                      ?? throw new CartKitNotFoundException(cartKitId);
        if (userId != cartKit.Cart.UserId)
            throw new CartKitActionForbiddenException(cartKitId);
        return new CartKitResponse(cartKit.Id, user.Id, mapper.Map<KitResponse>(cartKit.Kit));
    }

    public async Task<IEnumerable<CartKitResponse>> GetUserCartKitsAsync(ClaimsPrincipal userPrincipal)
    {
        if (!userPrincipal.TryGetUserId(out var userId))
            throw new InvalidOperationException("no claim in authorized user principal");
        var user = await usersRepo.GetByIdAsync(userId)
                   ?? throw new UserNotFoundException(userId);
        await usersRepo.LoadReference(user, u => u.Cart);
        if (user.Cart == null)
            return Array.Empty<CartKitResponse>();
        await cartsRepo.LoadCollection(user.Cart, c => c.CartKits);
        foreach (var cartKit in user.Cart.CartKits)
        {
            await cartKitsRepo.LoadReference(cartKit, ck => ck.Kit);
            await kitsRepo.LoadReference(cartKit.Kit, k => k.Category);
        }

        return user.Cart.CartKits
            .Select(ck => new CartKitResponse(ck.Id, user.Id, mapper.Map<KitResponse>(ck.Kit)));
    }

    public async Task<IEnumerable<CartKitItemResponse>> GetCartKitItemsAsync(ClaimsPrincipal userPrincipal,
        Guid cartKitId)
    {
        if (!userPrincipal.TryGetUserId(out var userId))
            throw new InvalidOperationException("no claim in authorized user principal");
        var user = await usersRepo.GetByIdAsync(userId)
                   ?? throw new UserNotFoundException(userId);
        var cartKit = await cartKitsRepo.Query()
                          .AsNoTracking()
                          .Include(c => c.Cart)
                          .Include(c => c.CartKitItems)
                          .ThenInclude(cki => cki.SelectedPropertyOptions)
                          .Include(c => c.CartKitItems)
                          .ThenInclude(cki => cki.KitItem)
                          .ThenInclude(ki => ki.Item)
                          .ThenInclude(i => i.ItemProperties)
                          .ThenInclude(ip => ip.Options)
                          .Include(c => c.CartKitItems)
                          .ThenInclude(cki => cki.KitItem)
                          .ThenInclude(ki => ki.Item)
                          .ThenInclude(i => i.ItemProperties)
                          .ThenInclude(ip => ip.Property)
                          .SingleOrDefaultAsync(c => c.Id == cartKitId)
                      ?? throw new CartKitNotFoundException(cartKitId);
        if (cartKit.Cart.UserId != user.Id)
            throw new CartKitActionForbiddenException(cartKitId);
        return cartKit.CartKitItems.Select(cki => new CartKitItemResponse(cartKit.Id,
            new CartKitItemKitInfo(cki.KitItem.KitId, cki.Quantity,
                new CartKitItemInfo(cki.KitItem.ItemId,
                    cki.KitItem.Item.Name,
                    cki.KitItem.Item.Description,
                    Path.GetFileNameWithoutExtension(cki.KitItem.Item.ImagePath),
                    cki.KitItem.Item.Price,
                    cki.KitItem.Item.ItemProperties.Select(ip => new CartKitItemPropertyInfo(ip.ItemId,
                        new PropertyResponse(ip.Property.Id, ip.Property.Name),
                        cki.SelectedPropertyOptions.SingleOrDefault(spo => spo.ItemPropertyId == ip.Id)?.Id,
                        ip.Options.Select(o => new OptionResponse(o.Id,
                            o.Value,
                            Path.GetFileNameWithoutExtension(o.RelatedImagePath),
                            o.PriceMultiplier,
                            o.IsAvailable,
                            o.IsDefault))))))));
    }

    public async Task<AddToCartResponse> AddToCartAsync(ClaimsPrincipal userPrincipal, AddToCartRequest request)
    {
        if (!userPrincipal.TryGetUserId(out var userId))
            throw new InvalidOperationException("no claim in authorized user principal");
        var user = await usersRepo.GetByIdAsync(userId)
                   ?? throw new UserNotFoundException(userId);
        await usersRepo.LoadReference(user, u => u.Cart);
        if (user.Cart == null)
        {
            user.Cart = new Cart();
            await usersRepo.UpdateAsync(user);
            await unitOfWork.SaveChangesAsync();
        }

        var kit = await kitsRepo.Query()
                      .Include(k => k.KitItems)
                      .ThenInclude(ki => ki.Item)
                      .ThenInclude(i => i.ItemProperties)
                      .ThenInclude(ip => ip.Options)
                      .SingleOrDefaultAsync(k => k.Id == request.KitId)
                  ?? throw new KitNotFoundException(request.KitId);
        var cartKit = new CartKit
        {
            CartId = user.Cart.Id,
            KitId = kit.Id,
            CartKitItems = new List<CartKitItem>()
        };
        foreach (var item in request.Items)
        {
            var kitItem = kit.KitItems.SingleOrDefault(ki => ki.ItemId == item.ItemId)
                          ?? throw new KitItemBadRequestException(request);
            var cartKitItem = new CartKitItem
            {
                KitItemId = kitItem.Id,
                Quantity = item.Quantity,
                SelectedPropertyOptions = new List<CartKitItemSelectedPropertyOption>()
            };
            foreach (var prop in item.Properties)
            {
                var itemProp = kitItem.Item.ItemProperties.SingleOrDefault(ip => ip.PropertyId == prop.PropertyId);
                if (itemProp == null)
                    throw new PropertyNotFoundException(prop.PropertyId);
                var opt = itemProp.Options.SingleOrDefault(o => o.Id == prop.SelectedOptionId);
                if (opt == null)
                    throw new OptionNotFoundException(prop.SelectedOptionId);
                cartKitItem.SelectedPropertyOptions.Add(new CartKitItemSelectedPropertyOption
                {
                    ItemPropertyId = itemProp.Id,
                    ItemPropertyOptionId = prop.SelectedOptionId
                });
            }

            cartKit.CartKitItems.Add(cartKitItem);
        }

        await cartKitsRepo.CreateAsync(cartKit);
        await unitOfWork.SaveChangesAsync();

        return new AddToCartResponse(cartKit.Id, user.Id, kit.Id);
    }

    public async Task<UpdateCartKitResponse> UpdateCartKitAsync(ClaimsPrincipal userPrincipal, Guid cartKitId,
        UpdateCartKitRequest request)
    {
        if (!userPrincipal.TryGetUserId(out var userId))
            throw new InvalidOperationException("no claim in authorized user principal");
        var user = await usersRepo.Query()
                .AsNoTracking()
                .Include(u => u.Cart)
                .ThenInclude(c => c.CartKits)
                .ThenInclude(ck => ck.CartKitItems)
                .Include(u => u.Cart)
                .ThenInclude(c => c.CartKits)
                .ThenInclude(ck => ck.Kit)
                .ThenInclude(k => k.KitItems)
                .ThenInclude(ki => ki.Item)
                .ThenInclude(i => i.ItemProperties)
                .ThenInclude(ip => ip.Options)
                .SingleOrDefaultAsync(u => u.Id == userId)
                   ?? throw new UserNotFoundException(userId);
        var cartKit = user.Cart?.CartKits.SingleOrDefault(ck => ck.Id == cartKitId);
        if (cartKit == null)
            throw new CartKitNotFoundException(cartKitId);
        foreach (var cki in cartKit.CartKitItems)
            await cartKitItemsRepo.DeleteAsync(cki);
        cartKit.CartKitItems = new List<CartKitItem>();
        foreach (var item in request.Items)
        {
            var kitItem = cartKit.Kit.KitItems.SingleOrDefault(ki => ki.ItemId == item.ItemId)
                          ?? throw new KitItemBadRequestException(request);
            var cartKitItem = new CartKitItem
            {
                KitItemId = kitItem.Id,
                Quantity = item.Quantity,
                SelectedPropertyOptions = new List<CartKitItemSelectedPropertyOption>()
            };
            foreach (var prop in item.Properties)
            {
                var itemProp = kitItem.Item.ItemProperties.SingleOrDefault(ip => ip.PropertyId == prop.PropertyId);
                if (itemProp == null)
                    throw new PropertyNotFoundException(prop.PropertyId);
                var opt = itemProp.Options.SingleOrDefault(o => o.Id == prop.SelectedOptionId);
                if (opt == null)
                    throw new OptionNotFoundException(prop.SelectedOptionId);
                cartKitItem.SelectedPropertyOptions.Add(new CartKitItemSelectedPropertyOption
                {
                    ItemPropertyId = itemProp.Id,
                    ItemPropertyOptionId = prop.SelectedOptionId
                });
            }
            cartKit.CartKitItems.Add(cartKitItem);
        }
        
        await cartKitsRepo.UpdateAsync(cartKit);
        await unitOfWork.SaveChangesAsync();
        
        return new UpdateCartKitResponse(cartKit.Id, user.Id, cartKit.Kit.Id);
    }
}