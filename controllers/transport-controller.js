const Transport = require('../models/transport');

// Get all transports
exports.getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.find();
    res.render('index', { transports });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching transports');
  }
};

// Render create form
exports.getCreateForm = (req, res) => {
  res.render('form', { transport: null });
};

// Create transport
exports.createTransport = async (req, res) => {
  try {
    const { name, mobility, consent, dnar, respect_form, bariatric, pickup, dropoff, pickup_mileage, dropoff_mileage } = req.body;

    const validPickupMileage = Number(pickup_mileage);
    const validDropoffMileage = Number(dropoff_mileage);

    if (isNaN(validPickupMileage) || isNaN(validDropoffMileage)) {
      return res.status(400).send('Pickup and Dropoff Mileage must be valid numbers');
    }

    const total_mileage = Math.abs(validDropoffMileage - validPickupMileage);

    const transport = new Transport({
      name,
      mobility,
      consent,
      dnar,
      respect_form,
      bariatric,
      pickup,
      dropoff,
      pickup_mileage: validPickupMileage,
      dropoff_mileage: validDropoffMileage,
      total_mileage,
    });

    await transport.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating transport');
  }
};

// Update and Delete handlers follow the same naming updates.


// routes/transport-routes.js
const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transport-controller');

router.get('/', transportController.getAllTransports);
router.get('/create', transportController.getCreateForm);
router.post('/create', transportController.createTransport);

module.exports = router;

