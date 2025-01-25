const mongoose = require('mongoose');

const barberShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: false,
  },
  distance: {
    type: Number, // Örneğin, km cinsinden
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('BarberShop', barberShopSchema);