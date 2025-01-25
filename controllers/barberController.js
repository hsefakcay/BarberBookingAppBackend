const Barber = require('../models/barberModel');

// Tüm berberleri getir
exports.getAllBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find()
      .populate('barberShop')
      .populate('services')
      .exec();

    res.status(200).json({
      status: 'success',
      results: barbers.length,
      data: {
        barbers,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred while fetching barbers.',
      error: err.message,
    });
  }
};

// Yeni bir berber oluştur
exports.createBarber = async (req, res) => {
  try {
    const newBarber = new Barber(req.body);
    await newBarber.save();

    res.status(201).json({
      status: 'success',
      data: {
        barber: newBarber,
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

// ID ile berberi getir
exports.getBarberById = async (req, res) => {
  try {
    const barber = await Barber.findById(req.params.id)
      .populate('barberShop')
      .populate('services');

    if (!barber) {
      return res.status(404).json({
        status: 'fail',
        message: 'Barber not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        barber,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred while fetching the barber.',
      error: err.message,
    });
  }
};

// Berber güncelle
exports.updateBarber = async (req, res) => {
  try {
    const updatedBarber = await Barber.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Gönderilen verileri doğrular
    });

    if (!updatedBarber) {
      return res.status(404).json({
        status: 'fail',
        message: 'Barber not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        barber: updatedBarber,
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

// Berber sil
exports.deleteBarber = async (req, res) => {
  try {
    const barber = await Barber.findByIdAndDelete(req.params.id);

    if (!barber) {
      return res.status(404).json({
        status: 'fail',
        message: 'Barber not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Barber deleted successfully.',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred while deleting the barber.',
      error: err.message,
    });
  }
};