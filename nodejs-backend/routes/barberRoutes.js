const express = require('express');
const router = express.Router();
const barberController = require('../controllers/barberController');

/**
 * @swagger
 * tags:
 *   name: Barbers
 *   description: Operations related to barbers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Barber:
 *       type: object
 *       required:
 *         - name
 *         - barberShop
 *       properties:
 *         id:
 *           type: string
 *           description: Unique ID of the barber
 *         name:
 *           type: string
 *           description: Barber's name
 *         photo:
 *           type: string
 *           description: URL of the barber's photo (optional)
 *         ratings:
 *           type: number
 *           description: Barber's rating (between 0 and 5)
 *           minimum: 0
 *           maximum: 5
 *         reviews:
 *           type: number
 *           description: Number of reviews the barber has received
 *         barberShop:
 *           type: string
 *           description: ID of the associated barber shop
 *         services:
 *           type: array
 *           items:
 *             type: string
 *           description: List of service IDs provided by the barber
 *       example:
 *         id: "12345"
 *         name: "John Doe"
 *         photo: "https://example.com/photo.jpg"
 *         ratings: 4.5
 *         reviews: 120
 *         barberShop: "67890"
 *         services: ["service1", "service2"]
 */

/**
 * @swagger
 * /barbers:
 *   get:
 *     summary: Get all barbers
 *     tags: [Barbers]
 *     responses:
 *       200:
 *         description: List of all barbers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Barber'
 *       500:
 *         description: Internal server error
 */
router.get('/', barberController.getAllBarbers);

/**
 * @swagger
 * /barbers:
 *   post:
 *     summary: Create a new barber
 *     tags: [Barbers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Barber'
 *     responses:
 *       201:
 *         description: Barber created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barber'
 *       400:
 *         description: Bad request (validation error)
 */
router.post('/', barberController.createBarber);

/**
 * @swagger
 * /barbers/{id}:
 *   get:
 *     summary: Get a barber by ID
 *     tags: [Barbers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Barber ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Barber details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barber'
 *       404:
 *         description: Barber not found
 */
router.get('/:id', barberController.getBarberById);

/**
 * @swagger
 * /barbers/{id}:
 *   put:
 *     summary: Update a barber by ID
 *     tags: [Barbers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Barber ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Barber'
 *     responses:
 *       200:
 *         description: Barber updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barber'
 *       404:
 *         description: Barber not found
 *       400:
 *         description: Invalid data
 */
router.put('/:id', barberController.updateBarber);

/**
 * @swagger
 * /barbers/{id}:
 *   delete:
 *     summary: Delete a barber by ID
 *     tags: [Barbers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Barber ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Barber deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Barber deleted successfully"
 *       404:
 *         description: Barber not found
 */
router.delete('/:id', barberController.deleteBarber);

module.exports = router;
