using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace barberBookingAPI.Models
{
    public class Barber
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;        
        public string Photo { get; set; } = string.Empty;        
        public decimal Ratings  { get; set; } 
        public decimal Reviews  { get; set; } 
        public int BarbershopId { get; set; } 
        public Barbershop? Barbershop { get; set; }
        
        // Many-to-Many ilişki
        public List<BarberService>? BarberServices { get; set; }

    }

}

