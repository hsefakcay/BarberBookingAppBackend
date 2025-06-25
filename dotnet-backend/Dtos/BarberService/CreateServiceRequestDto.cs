using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace barberBookingAPI.Dtos.BarberService
{
    public class CreateServiceRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } 
        public decimal Duration { get; set; } 
    }
}