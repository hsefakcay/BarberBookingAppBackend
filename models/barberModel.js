// models/barberModel.js
const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String, // Fotoğrafın URL'si
    required: false
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  barberShop: {
    type: mongoose.Schema.Types.ObjectId, // Barbershop ile ilişki
    ref: 'BarberShop',
    required: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId, // BarberService ile ilişki
      ref: 'BarberService',
    },
  ],
});

module.exports = mongoose.model('Barber', barberSchema);