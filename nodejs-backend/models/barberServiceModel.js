// models/barberServiceModel.js
const mongoose = require('mongoose');

// BarberService modeli
const barberServiceSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  duration: { 
    type: Number, // Dakika cinsinden süre
    required: true
  },

});

// Modeli oluştur ve dışa aktar
const BarberService = mongoose.model('BarberService', barberServiceSchema);
module.exports = BarberService;