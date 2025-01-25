const express = require('express');
const router = express.Router();
const barberShopController = require('../controllers/barberShopController');

/**
 * @swagger
 * tags:
 *   name: BarberShops
 *   description: Operations related to barber shops
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BarberShop:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Unique ID of the barber shop
 *         name:
 *           type: string
 *           description: The name of the barber shop
 *         photo:
 *           type: string
 *           description: URL of the barber shop photo
 *         ratings:
 *           type: number
 *           default: 0
 *           description: Ratings of the barber shop (0-5)
 *         reviews:
 *           type: number
 *           default: 0
 *           description: Number of reviews for the barber shop
 *       example:
 *         id: "5f8f8c0c9d1c8b1f1d2f5d7b"
 *         name: "Super Cuts"
 *         photo: "https://example.com/photo.jpg"
 *         ratings: 4.5
 *         reviews: 100
 */

/**
 * @swagger
 * /barbershops:
 *   get:
 *     summary: Get all barber shops
 *     tags: [BarberShops]
 *     responses:
 *       200:
 *         description: List of all barber shops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BarberShop'
 *       500:
 *         description: Internal server error
 */
router.get('/', barberShopController.getAllBarberShops);

/**
 * @swagger
 * /barbershops:
 *   post:
 *     summary: Create a new barber shop
 *     tags: [BarberShops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BarberShop'
 *     responses:
 *       201:
 *         description: Barber shop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BarberShop'
 *       400:
 *         description: Bad request (validation error)
 */
router.post('/', barberShopController.createBarberShop);

module.exports = router;
