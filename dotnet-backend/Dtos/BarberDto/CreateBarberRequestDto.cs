using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using barberBookingAPI.Models;

namespace barberBookingAPI.Dtos.BarberDto
{
    public class CreateBarberRequestDto
    {
        public string Name { get; set; } = string.Empty;        
        public string Photo { get; set; } = string.Empty;        
        public decimal Ratings  { get; set; } 
        public decimal Reviews  { get; set; } 
        public int BarbershopId { get; set; }       
        public List<int>? ServiceIds { get; set; }

    }
}