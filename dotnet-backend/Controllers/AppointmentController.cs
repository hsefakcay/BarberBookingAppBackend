using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using barberBookingAPI.Data;
using barberBookingAPI.Dtos.Appointmet;
using barberBookingAPI.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace barberBookingAPI.Controllers
{
    [Route("api/appointment")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Appointmet
        [HttpGet]
        public async Task<IActionResult> GetAppointments(
            [FromQuery] int? barberId, // 👈 Nullable yapın
            [FromQuery] string? date)  // 👈 Nullable yapın
        {
            // Temel sorgu
            var query = _context.Appointments
                .Include(a => a.Barber)
                .AsQueryable();

            // BarberId filtresi
            if (!string.IsNullOrEmpty(barberId.ToString()))
            {
                query = query.Where(a => a.BarberId == barberId);
            }

            // Date filtresi
            if (!string.IsNullOrEmpty(date))
            {
                query = query.Where(a => a.Date == date);
            }

            // DTO'ya çevir ve listele
            var result = await query
                .Select(a => a.ToAppointmetDto())
                .ToListAsync();

            return Ok(result);
        }
        
        // GET: api/Appointment/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppointmentById([FromRoute] int id)
        {
            var appointment = await _context.Appointments
            .Include(a => a.Barber) // Barber bilgilerini yükle
            .FirstOrDefaultAsync(a => a.Id == id);

            if (appointment == null)
            {
                return NotFound();
            }

            var appointmentDto = appointment.ToAppointmetDto();

            return Ok(appointmentDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAppointment([FromBody] CreateAppointmetDto appointmetDto)
        {
            if (appointmetDto == null){
                return BadRequest("Invalid data.");
            }

            var barber = await _context.Barbers.FindAsync(appointmetDto.BarberId);
            if (barber == null){
                return NotFound("Barber not found.");
            }
        
            var appointmetModel = appointmetDto.ToAppointmentFromCreateDto();

            _context.Appointments.Add(appointmetModel);
            await _context.SaveChangesAsync();
            
            // DTO'ya çevirerek döndür
            var appointmentDto = appointmetModel.ToAppointmetDto();

            return CreatedAtAction(
                        actionName: "GetAppointmentById", 
                        routeValues: new { id = appointmetModel.Id }, 
                        value: appointmentDto
                    );
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var appointmentModel = _context.Appointments.FirstOrDefault(x => x.Id == id);

            if(appointmentModel == null)
            {
                return NotFound(); 
            }

            _context.Appointments.Remove(appointmentModel);
            _context.SaveChanges();

            return NoContent();
        }
    }
}