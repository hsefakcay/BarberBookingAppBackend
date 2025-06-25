using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using barberBookingAPI.Data;
using barberBookingAPI.Dtos.BarberShop;
using barberBookingAPI.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace barberBookingAPI.Controllers
{
    [Route("api/barbershop")]
    [ApiController]
    public class BarbershopController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BarbershopController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var barbershops = _context.Barbershops
            .Include(b => b.Barbers)
            .ToList().Select(b => b.ToBarberShopDto());
              // Flutter'ın beklediği formatta wrap et
            var response = new
            {
                status = "success",
                data = new
                {
                    shops = barbershops // Buradaki `barbers` listesi doğrudan dönecek
                }
            };

            return Ok(response);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var barbershop = _context.Barbershops.Find(id);
            
            if(barbershop == null)
            {
                return NotFound();
            }

            return Ok(barbershop);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateBarbershopRequestDto barbershopDto)
        {
            var barbershopModel = barbershopDto.ToBarberFromCreateDto();

            _context.Barbershops.Add(barbershopModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new {id = barbershopModel.Id}, barbershopModel);
        }
        
    }
}