const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');


// Kullanıcıya göre randevuları getirme route'u
router.get('/user/:userId', appointmentController.getAppointmentsByUser);


/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Operations related to appointments
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - barberId
 *         - userId
 *         - date
 *         - time
 *       properties:
 *         id:
 *           type: string
 *           description: Unique ID of the appointment
 *         barberId:
 *           type: string
 *           description: The barber's ID
 *         userId:
 *           type: string
 *           description: The Firebase user ID
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the appointment (YYYY-MM-DD)
 *         time:
 *           type: string
 *           format: time
 *           description: Time of the appointment (HH:mm)
 *         status:
 *           type: string
 *           enum: ['confirmed', 'canceled']
 *           description: Appointment status (default is 'confirmed')
 *       example:
 *         id: "123456"
 *         barberId: "60c72b2f5f4e7c001c3b5a12"
 *         userId: "user123"
 *         date: "2025-01-18"
 *         time: "15:00"
 *         status: "confirmed"
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments by date
 *     tags: [Appointments]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         description: Date of appointments (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of appointments on the given date
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: No appointments found for the given date
 *       500:
 *         description: Internal server error
 */
router.get('/', appointmentController.getAppointmentsByDate);

/**
 * @swagger
 * /appointments/check:
 *   get:
 *     summary: Check time slot availability
 *     tags: [Appointments]
 *     parameters:
 *       - in: query
 *         name: barberId
 *         required: true
 *         description: Barber ID to check availability
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: true
 *         description: Date of the appointment (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: time
 *         required: true
 *         description: Time slot to check availability (HH:mm)
 *         schema:
 *           type: string
 *           format: time
 *     responses:
 *       200:
 *         description: Availability check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: boolean
 *                   description: Whether the time slot is available
 *                 message:
 *                   type: string
 *                   description: Message about availability
 *               example:
 *                 available: true
 *                 message: "The time slot is available"
 *       404:
 *         description: Barber or time slot not found
 */
router.get('/check', appointmentController.checkAvailability);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request (validation error)
 */
router.post('/', appointmentController.createAppointment);

/**
 * @swagger
 * /appointments/{id}:
 *   patch:
 *     summary: Cancel an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Appointment ID to cancel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *       400:
 *         description: Invalid data
 */
router.patch('/:id', appointmentController.cancelAppointment);

module.exports = router;
