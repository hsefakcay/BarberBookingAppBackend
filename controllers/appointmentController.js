const Appointment = require('../models/appointmentModel');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    const { barberId, userId, date, time } = req.body;
  
    try {
      const existingAppointment = await Appointment.findOne({ barberId, date, time });
  
      if (existingAppointment) {
        return res.status(400).json({ message: 'This time slot is already booked.' });
      }
  
      const newAppointment = new Appointment({ barberId, userId, date, time });
      await newAppointment.save();
  
      res.status(201).json({ message: 'Appointment created successfully.', newAppointment });
    } catch (error) {
      res.status(500).json({ message: 'Error creating appointment', error });
    }
  };

// Get all appointments for a barber on a specific date
exports.getAppointmentsByDate = async (req, res) => {
  const { barberId, date } = req.query;

  try {
    const appointments = await Appointment.find({
      barberId: barberId,
      date: date,
      status: "confirmed"
    });
    const bookedTimes = appointments.map(appointment => appointment.time);
    res.status(200).json(bookedTimes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};
// Get all appointments for a specific user
exports.getAppointmentsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const appointments = await Appointment.find({ userId });

    if (!appointments.length) {
      return res.status(404).json({ message: 'No appointments found for this user.' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user appointments', error });
  }
};

// Check if a time slot is available
exports.checkAvailability = async (req, res) => {
    const { barberId, date, time } = req.query;
  
    try {
      const existingAppointment = await Appointment.findOne({ barberId, date, time });
  
      if (existingAppointment) {
        return res.status(400).json({ message: 'This time slot is already booked.' });
      }
  
      res.status(200).json({ message: 'This time slot is available.' });
    } catch (error) {
      res.status(500).json({ message: 'Error checking availability', error });
    }
  };

  // Cancel an appointment
exports.cancelAppointment = async (req, res) => {
    const { id } = req.params;
  
    try {
      const appointment = await Appointment.findByIdAndUpdate(
        id,
        { status: 'canceled' },
        { new: true }
      );
  
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found.' });
      }
  
      res.status(200).json({ message: 'Appointment canceled successfully.', appointment });
    } catch (error) {
      res.status(500).json({ message: 'Error canceling appointment', error });
    }
  };
  