using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using barberBookingAPI.Dtos.BarberDto;
using barberBookingAPI.Dtos.BarberShop;
using barberBookingAPI.Models;

namespace barberBookingAPI.Mappers
{
    public static class BarbershopMappers
    {
        public static BarberShopDto ToBarberShopDto(this Barbershop barbershop)
    {
        return new BarberShopDto
        {
            Id = barbershop.Id,
            Name = barbershop.Name,
            Image = barbershop.Image,
            Rating = barbershop.Rating,
            Distance = barbershop.Distance,
            BarberIds = barbershop.Barbers?
                .Where(b => b.BarbershopId != null)
                .Select(b => b.Id).ToList() ?? new List<int>() // null ise boş liste
        };
    }
        
        public static Barbershop ToBarberFromCreateDto(this CreateBarbershopRequestDto barbershopDto)
        {
            return new Barbershop
            {
                Name = barbershopDto.Name,
                Barbers = barbershopDto.Barbers,
                Distance = barbershopDto.Distance,
                Image = barbershopDto.Image,
                Rating = barbershopDto.Rating
            };
        }
    }
}