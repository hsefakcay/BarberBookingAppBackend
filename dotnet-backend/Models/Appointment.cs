using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace barberBookingAPI.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        public int BarberId { get; set; }
        public Barber Barber { get; set; } = null!; // Barber ile ilişkilendirme

        public string UserId { get; set; } = string.Empty;

        public string Date { get; set; } = string.Empty;

        public string Time { get; set; } = string.Empty;

        public AppointmentStatus Status { get; set; } = AppointmentStatus.Confirmed;
    }

    public enum AppointmentStatus
    {
        Confirmed,
        Canceled
    }
    
}