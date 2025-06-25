using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using barberBookingAPI.Dtos.Service;

namespace barberBookingAPI.Dtos.BarberDto
{
    public class BarberDto
    {
        [JsonPropertyName("_id")] // Node.js'den gelen "id" field'ına eşleştir
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;
        [JsonPropertyName("photo")]
        public string Photo { get; set; } = string.Empty;        
        [JsonPropertyName("ratings")]
        public decimal Ratings  { get; set; } 
        [JsonPropertyName("reviews")]
        public decimal Reviews  { get; set; } 
        [JsonPropertyName("barberShopId")]
        public int BarbershopId { get; set; }  
        [JsonPropertyName("services")]
        public List<ServiceResponseDto>? Services { get; set; }
    }
}