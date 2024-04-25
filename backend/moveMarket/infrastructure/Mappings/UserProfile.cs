using AutoMapper;
using core.Dto.Auth;
using core.Dto.User;
using domain.Entities;

namespace infrastructure.Mappings;

internal class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<ApplicationUser, UserResponse>(MemberList.Destination)
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Login, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.DisplayName));

        CreateMap<CreateUserRequest, ApplicationUser>(MemberList.None)
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Login))
            .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.UserName))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Login));

        CreateMap<SetAddressRequest, Address>(MemberList.None);
        CreateMap<Address, AddressResponse>(MemberList.Destination)
            .ForMember(dest => dest.AddressId, opt => opt.MapFrom(src => src.Id));

        CreateMap<ApplicationUser, UserAddressResponse>(MemberList.Destination)
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Login, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.DisplayName));
    }
}