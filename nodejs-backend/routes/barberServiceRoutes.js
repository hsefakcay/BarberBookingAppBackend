const express = require('express');
const router = express.Router();
const barberServiceController = require('../controllers/barberServiceController');

/**
 * @swagger
 * tags:
 *   name: BarberServices
 *   description: Operations related to barber services
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BarberService:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - duration
 *       properties:
 *         id:
 *           type: string
 *           description: Unique ID of the barber service
 *         name:
 *           type: string
 *           description: Name of the barber service (e.g., Haircut, Shaving)
 *         price:
 *           type: number
 *           description: Price of the barber service
 *         duration:
 *           type: number
 *           description: Duration of the service in minutes
 *       example:
 *         id: "5f8f8c0c9d1c8b1f1d2f5d7b"
 *         name: "Haircut"
 *         price: 20
 *         duration: 30
 */

/**
 * @swagger
 * /barberservices:
 *   get:
 *     summary: Get all barber services
 *     tags: [BarberServices]
 *     responses:
 *       200:
 *         description: List of all barber services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BarberService'
 *       500:
 *         description: Internal server error
 */
router.get('/', barberServiceController.getAllBarberServices);

/**
 * @swagger
 * /barberservices:
 *   post:
 *     summary: Create a new barber service
 *     tags: [BarberServices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BarberService'
 *     responses:
 *       201:
 *         description: Barber service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BarberService'
 *       400:
 *         description: Bad request (validation error)
 */
router.post('/', barberServiceController.createBarberService);

/**
 * @swagger
 * /barberservices/{id}:
 *   get:
 *     summary: Get a single barber service by ID
 *     tags: [BarberServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the barber service
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of a single barber service
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BarberService'
 *       404:
 *         description: Barber service not found
 */
router.get('/:id', barberServiceController.getBarberServiceById);

/**
 * @swagger
 * /barberservices/{id}:
 *   put:
 *     summary: Update an existing barber service by ID
 *     tags: [BarberServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the barber service to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BarberService'
 *     responses:
 *       200:
 *         description: Barber service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BarberService'
 *       404:
 *         description: Barber service not found
 */
router.put('/:id', barberServiceController.updateBarberService);

/**
 * @swagger
 * /barberservices/{id}:
 *   delete:
 *     summary: Delete an existing barber service by ID
 *     tags: [BarberServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the barber service to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Barber service deleted successfully
 *       404:
 *         description: Barber service not found
 */
router.delete('/:id', barberServiceController.deleteBarberService);

module.exports = router;
