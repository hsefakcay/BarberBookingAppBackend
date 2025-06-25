using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using barberBookingAPI.Models;

namespace barberBookingAPI.Dtos.Appointmet
{
    public class AppointmentDto
    {
        [JsonPropertyName("_id")]
        public int Id { get; set; }
        [JsonPropertyName("barberId")]
        public int BarberId { get; set; }
        [JsonPropertyName("userId")]
        public string UserId { get; set; } = string.Empty;
        [JsonPropertyName("date")]
        public string Date { get; set; } = string.Empty;
        [JsonPropertyName("time")]
        public string Time { get; set; } = string.Empty;
        [JsonPropertyName("status")]
        public AppointmentStatus Status { get; set; } // Randevu durumu
    }
}