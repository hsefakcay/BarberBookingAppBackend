using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using barberBookingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace barberBookingAPI.Data
{
     public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {

        }

        public DbSet<Barber> Barbers { get; set; }  // db table 
        public DbSet<Barbershop> Barbershops { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<BarberService> BarberServices { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             // BarberService tablosu için Composite Primary Key
            modelBuilder.Entity<BarberService>()
            .HasKey(bs => new { bs.BarberId, bs.ServiceId });

            base.OnModelCreating(modelBuilder);
        }
    }
}