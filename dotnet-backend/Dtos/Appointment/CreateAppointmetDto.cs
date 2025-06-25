using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using barberBookingAPI.Models;

namespace barberBookingAPI.Dtos.Appointmet
{
    public class CreateAppointmetDto
    {
        [JsonPropertyName("barberId")]
        public int BarberId { get; set; } // Randevu alınacak berberin ID'si
        [JsonPropertyName("userId")]
        public string UserId { get; set; } = string.Empty; // Randevu alan kullanıcının ID'si
        [JsonPropertyName("date")]
        public string Date { get; set; } = string.Empty; // Randevu tarihi (YYYY-MM-DD)
        [JsonPropertyName("time")]
        public string Time { get; set; } = string.Empty; // Randevu saati (HH:mm)
        
    }
}