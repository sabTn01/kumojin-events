using AutoMapper;
using Kumojin.Backend.Domain.KumojinEvents;
using Kumojin.Backend.Infrastructure.Dtos;

namespace Kumojin.Backend.Infrastructure.Configuration
{
    public class AutoMapperProfile : MapperConfigurationExpression
    {
        public AutoMapperProfile()
        {
            CreateMap<KumojinEventInput, KumojinEvent>();
            CreateMap<KumojinEvent, KumojinEventOutputView>();
        }
    }
}