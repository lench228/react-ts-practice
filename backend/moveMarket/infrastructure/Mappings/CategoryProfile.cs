using AutoMapper;
using core.Dto.Categories;
using domain.Entities;

namespace infrastructure.Mappings;

internal class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        CreateMap<Category, CategoryResponse>(MemberList.None)
            .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.Id));
    }
}