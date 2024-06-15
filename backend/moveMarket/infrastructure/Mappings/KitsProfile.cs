using AutoMapper;
using core.Dto.Kits;
using domain.Entities;

namespace infrastructure.Mappings;

internal class KitsProfile : Profile
{
    public KitsProfile()
    {
        CreateMap<Kit, KitResponse>(MemberList.None)
            .ForMember(dest => dest.ImageId, opt => opt.MapFrom(src => Path.GetFileNameWithoutExtension(src.ImagePath)))
            .ForMember(dest => dest.KitId, opt => opt.MapFrom(src => src.Id));
    }
}