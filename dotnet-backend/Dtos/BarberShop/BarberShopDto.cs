using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using barberBookingAPI.Models;

namespace barberBookingAPI.Dtos.BarberShop
{
    public class BarberShopDto
    {
        [JsonPropertyName("_id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;
        [JsonPropertyName("image")]
        public string Image { get; set; } = string.Empty;
        [JsonPropertyName("distance")]
        public decimal Distance { get; set; }
        [JsonPropertyName("ratings")]
        public decimal Rating { get; set; }
        [JsonPropertyName("barbers")]
        public List<int>? BarberIds { get; set; } = new List<int>();
    }
    
}