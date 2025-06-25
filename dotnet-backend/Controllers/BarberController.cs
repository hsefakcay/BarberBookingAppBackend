using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using barberBookingAPI.Data;
using barberBookingAPI.Dtos.BarberDto;
using barberBookingAPI.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace barberBookingAPI.Controllers
{
    [Route("api/barber")]
    [ApiController]
    public class BarberController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BarberController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllBarber()
        {
             var barbers = _context.Barbers
             .Include(b => b.BarberServices) // BarberServices ilişkisini yükle
             .ThenInclude(bs => bs.Service)  // Service ilişkisini yükle
             .ToList()
             .Select(b => b.ToBarberDto());

              // Flutter'ın beklediği formatta wrap et
            var response = new
            {
                status = "success",
                data = new
                {
                    barbers = barbers // Buradaki `barbers` listesi doğrudan dönecek
                }
            };

            return Ok(response);
        }


        [HttpGet("{id}")]
        public  IActionResult GetBarberByIdAsync([FromRoute] int id)
        {
            
            // Barber'ı ve ilişkili BarberServices ile Service'leri yükle
            var barber = _context.Barbers
                .Include(b => b.BarberServices) // BarberServices ilişkisini yükle
                .ThenInclude(bs => bs.Service)  // Service ilişkisini yükle
                .FirstOrDefault(b => b.Id == id); // Id'ye göre filtrele
                
            if(barber == null)
            {
                return NotFound();
            }
            var response = new
            {
                status = "success",
                data = new
                {
                    barber = barber.ToBarberDto() // Buradaki `barbers` listesi doğrudan dönecek
                }
            };
           
            return  Ok(response);
        }


        [HttpPost]
        public async Task<IActionResult> CreateBarberAsync([FromBody] CreateBarberRequestDto barberDto)
        {
            if (barberDto == null){
                return BadRequest("Invalid data.");
            }
            var barbershop = await _context.Barbershops.FindAsync(barberDto.BarbershopId);
            if (barbershop == null){
                return NotFound("Barbershop not found.");
            }
            // Service ID’lerine göre servisleri çekiyoruz
            var services = await _context.Services
                             .Where(s => (barberDto.ServiceIds ?? new List<int>()).Contains(s.Id))
                             .ToListAsync();
        
            var barberModel = barberDto.ToBarberFromCreateDto(services);

            _context.Barbers.Add(barberModel);
            _context.SaveChanges();
            
            // DTO'ya çevirerek döndür
            var responseDto = barberModel.ToBarberDto();

            return CreatedAtAction(nameof(GetBarberByIdAsync), new {id = barberModel.Id}, responseDto);
        }
        
    }
}