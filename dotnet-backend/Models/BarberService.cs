using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace barberBookingAPI.Models
{
    public class BarberService
    {
        public int BarberId { get; set; }
        public Barber? Barber { get; set; }

        public int ServiceId { get; set; }
        public Service? Service { get; set; }
        
    }
}