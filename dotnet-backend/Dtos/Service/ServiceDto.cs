using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace barberBookingAPI.Dtos.Service
{
    public class ServiceResponseDto
    {
        [JsonPropertyName("_id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }= string.Empty;
        [JsonPropertyName("price")]
        public decimal Price { get; set; } 
        [JsonPropertyName("duration")]
        public decimal Duration { get; set; } 
    }

    public class ServiceDto 
    {
        [JsonPropertyName("_id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;
        [JsonPropertyName("price")]
        public decimal Price { get; set; } 
        [JsonPropertyName("duration")]
        public decimal Duration { get; set; } 
    }
}