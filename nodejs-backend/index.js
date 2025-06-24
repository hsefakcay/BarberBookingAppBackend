require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const barberServiceRoutes = require('./routes/barberServiceRoutes');
const barberRoutes = require('./routes/barberRoutes');
const barberShopRoutes = require('./routes/barberShopRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// CORS Middleware
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
// Rotalar
app.use('/barbers', barberRoutes);
app.use('/barberservices', barberServiceRoutes);
app.use('/barbershops', barberShopRoutes);
app.use('/appointments', appointmentRoutes);

// Swagger 
const { swaggerUi, swaggerDocs } = require('./swagger');
// Swagger Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Ana Sayfa
app.get('/', (req, res) => {
  res.send('Barber Booking Backend API');
});

// 404 Hata Yakalama
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Global Hata Yönetimi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Sunucuyu Başlat
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))



