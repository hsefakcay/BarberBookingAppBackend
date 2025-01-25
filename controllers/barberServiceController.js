const BarberService = require('../models/barberServiceModel');

// Tüm barber servislerini getir
exports.getAllBarberServices = async (req, res) => {
  try {
    const services = await BarberService.find();

    res.status(200).json({
      status: 'success',
      results: services.length,
      data: {
        services,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred while fetching barber services.',
      error: err.message,
    });
  }
};

// Yeni bir barber servisi oluştur
exports.createBarberService = async (req, res) => {
  const { name, description, price } = req.body;

  const newService = new BarberService({
    name,
    description,
    price,
  });

  try {
    const savedService = await newService.save();

    res.status(201).json({
      status: 'success',
      data: {
        service: savedService,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent.',
      error: err.message,
    });
  }
};

// ID ile barber servisini bul
exports.getBarberServiceById = async (req, res) => {
  try {
    const service = await BarberService.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        status: 'fail',
        message: 'Barber service not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        service,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred while fetching the barber service.',
      error: err.message,
    });
  }
};

// Barber servisini güncelle
exports.updateBarberService = async (req, res) => {
  try {
    const updatedService = await BarberService.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Verilerin doğruluğunu kontrol et
    });

    if (!updatedService) {
      return res.status(404).json({
        status: 'fail',
        message: 'Barber service not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        service: updatedService,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent.',
      error: err.message,
    });
  }
};

// Barber servisini sil
exports.deleteBarberService = async (req, res) => {
  try {
    const service = await BarberService.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        status: 'fail',
        message: 'Barber service not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Barber service deleted successfully.',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred while deleting the barber service.',
      error: err.message,
    });
  }
};