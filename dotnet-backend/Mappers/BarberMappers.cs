using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using barberBookingAPI.Dtos.BarberDto;
using barberBookingAPI.Dtos.Service;
using barberBookingAPI.Models;

namespace barberBookingAPI.Mappers
{
    public static class BarberMapper
{
    public static BarberDto ToBarberDto(this Barber barber)
    {
        return new BarberDto
        {
            Id = barber.Id,
            Name = barber.Name,
            Photo = barber.Photo,
            Ratings = barber.Ratings,
            Reviews = barber.Reviews,
            BarbershopId = barber.BarbershopId,
            Services = barber.BarberServices?
                .Where(s => s.Service != null)
                .Select(s => new ServiceResponseDto
                {
                    Id = s.Service!.Id,
                    Name = s.Service!.Name ,
                    Duration = s.Service.Duration,
                    Price = s.Service.Price

                }).ToList() ?? new List<ServiceResponseDto>() // null ise boş liste
        };
    }
    public static CreateBarberRequestDto ToCreateBarberDto(this BarberDto barberDto)
    {
        return new CreateBarberRequestDto
        {
            Name = barberDto.Name,
            Photo = barberDto.Photo,
            Ratings = barberDto.Ratings,
            Reviews = barberDto.Reviews,
            BarbershopId = barberDto.BarbershopId,
        };
    }
    public static Barber ToBarberFromCreateDto(this CreateBarberRequestDto barberDto, List<Service> services)
    {
        return new Barber
        {
            Name = barberDto.Name,
            Photo = barberDto.Photo,
            Ratings = barberDto.Ratings,
            Reviews = barberDto.Reviews,
            BarbershopId = barberDto.BarbershopId,
            BarberServices = services.Select(s => new BarberService { ServiceId = s.Id }).ToList()
        };
    }
}
}