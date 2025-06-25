using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using barberBookingAPI.Models;

namespace barberBookingAPI.Dtos.BarberShop
{
    public class CreateBarbershopRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;

        public decimal Distance { get; set; }

        public decimal Rating { get; set; }

        public List<Barber>? Barbers { get; set; } = new List<Barber>();
    }
}