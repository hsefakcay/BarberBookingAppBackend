using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using barberBookingAPI.Dtos.Appointmet;
using barberBookingAPI.Models;

namespace barberBookingAPI.Mappers
{
    public static class AppointmetMappers
    {
        public static AppointmentDto ToAppointmetDto(this Appointment appointment)
        {
            return new AppointmentDto
            {
                Id = appointment.Id,
                BarberId = appointment.BarberId,
                UserId = appointment.UserId,
                Date = appointment.Date,
                Time = appointment.Time,
                Status = appointment.Status
            };
        }

        public static Appointment ToAppointmentFromCreateDto(this CreateAppointmetDto appointmentCreateDto)
        {
            return new Appointment
            {
                BarberId = appointmentCreateDto.BarberId,
                UserId = appointmentCreateDto.UserId,
                Date = appointmentCreateDto.Date,
                Time = appointmentCreateDto.Time,
                Status = AppointmentStatus.Confirmed //default status
            };
        }
    }
}