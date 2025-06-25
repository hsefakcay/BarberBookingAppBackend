using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using barberBookingAPI.Dtos.BarberService;
using barberBookingAPI.Dtos.Service;
using barberBookingAPI.Models;

namespace barberBookingAPI.Mappers
{
    public static class BarberServiceMappers
    {
        public static Service ToServiceFromCreateDto(this CreateServiceRequestDto serviceDto)
        {
            return new Service
            {
                Name = serviceDto.Name,
                Duration = serviceDto.Duration,
                Price = serviceDto.Price
            };
        }

        public static ServiceResponseDto ToServiceResponseDto(this Service serviceModel)
        {
            return new ServiceResponseDto
            {
                Name = serviceModel.Name,
                Duration = serviceModel.Duration,
                Price = serviceModel.Price
            };
        }

        public static ServiceDto ToServiceDto(this Service serviceModel)
        {
            return new ServiceDto
            {
                Id = serviceModel.Id,
                Name = serviceModel.Name,
                Duration = serviceModel.Duration,
                Price = serviceModel.Price
            };
        }
    }
}