using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace barberBookingAPI.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } 
        public decimal Duration { get; set; } 

         // Many-to-Many ilişki
        public List<BarberService>? BarberServices { get; set; }
    }
}