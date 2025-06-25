using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace barberBookingAPI.Models
{
    public class Barbershop
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;

        public decimal Distance { get; set; }

        public decimal Rating { get; set; }

        public List<Barber>? Barbers { get; set; } = new List<Barber>();
    }
}