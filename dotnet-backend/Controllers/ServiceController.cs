using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using barberBookingAPI.Data;
using barberBookingAPI.Dtos.BarberService;
using barberBookingAPI.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace barberBookingAPI.Controllers
{
    [Route("api/barberservice")]
    [ApiController]
    public class BarberServiceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BarberServiceController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var services = _context.Services.ToList().Select(s => s.ToServiceDto());

            var response = new
            {
                status = "success",
                results = services.Count(),
                data = new
                {
                    services = services // Buradaki `barbers` listesi doğrudan dönecek
                }
            };

            return Ok(response);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var service = _context.Services.Find(id);
            
            if(service == null)
            {
                return NotFound();
            }

            return  Ok(service.ToServiceResponseDto());
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateServiceRequestDto serviceDto)
        {
            var serviceModel = serviceDto.ToServiceFromCreateDto();

            _context.Services.Add(serviceModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new {id = serviceModel.Id}, serviceModel.ToServiceDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var serviceModel = _context.Services.FirstOrDefault(x => x.Id == id);

            if(serviceModel == null)
            {
                return NotFound(); 
            }

            _context.Services.Remove(serviceModel);
            _context.SaveChanges();

            return NoContent();
        }
        
    }
}