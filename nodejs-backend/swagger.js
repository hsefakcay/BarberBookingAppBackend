const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger Seçenekleri
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Barber Booking API',
      version: '1.0.0',
      description: 'Barber Booking App API Documentation',
      contact: {
        name: 'Developer',
        email: 'developer@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5005', // Backend URL
      },
    ],
  },
  apis: ['./routes/*.js'], // API dokümantasyonunu çekilecek dosya yolları
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };