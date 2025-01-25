const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barber',
    required: true,
  },
  userId: {
    type: String, // Firebase user ID
    required: true,
  },
  date: {
    type: String, // YYYY-MM-DD format
    required: true,
  },
  time: {
    type: String, // HH:mm format
    required: true,
  },
  status: {
    type: String,
    enum: ['confirmed', 'canceled'],
    default: 'confirmed',
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);