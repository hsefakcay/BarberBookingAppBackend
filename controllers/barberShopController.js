const BarberShop = require('../models/barberShopModel');

// Tüm barber shop'ları getir
exports.getAllBarberShops = async (req, res) => {
  try {
    const shops = await BarberShop.find();

    res.status(200).json({
      status: 'success',
      results: shops.length,
      data: {
        shops,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred while fetching barber shops.',
      error: err.message,
    });
  }
};

// Yeni bir barber shop oluştur
exports.createBarberShop = async (req, res) => {
  const { name, image, distance, ratings } = req.body;

  const newShop = new BarberShop({
    name,
    image,
    distance,
    ratings,
  });

  try {
    const savedShop = await newShop.save();

    res.status(201).json({
      status: 'success',
      data: {
        shop: savedShop,
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

// ID ile barber shop'ı getir
exports.getBarberShopById = async (req, res) => {
  try {
    const shop = await BarberShop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({
        status: 'fail',
        message: 'Barber shop not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        shop,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred while fetching the barber shop.',
      error: err.message,
    });
  }
};

// Barber shop güncelle
exports.updateBarberShop = async (req, res) => {
  try {
    const updatedShop = await BarberShop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Verilerin doğruluğunu kontrol et
    });

    if (!updatedShop) {
      return res.status(404).json({
        status: 'fail',
        message: 'Barber shop not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        shop: updatedShop,
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

// Barber shop sil
exports.deleteBarberShop = async (req, res) => {
  try {
    const shop = await BarberShop.findByIdAndDelete(req.params.id);

    if (!shop) {
      return res.status(404).json({
        status: 'fail',
        message: 'Barber shop not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Barber shop deleted successfully.',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred while deleting the barber shop.',
      error: err.message,
    });
  }
};