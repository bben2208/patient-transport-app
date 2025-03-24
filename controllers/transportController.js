const Transport = require('../models/transport');

// Show all transports
exports.getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.find({});
    res.render('index', { transports });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching transports');
  }
};

// Show create form
exports.getCreateForm = (req, res) => {
  res.render('form', { transport: null });
};

// Create a new transport
exports.createTransport = async (req, res) => {
  try {
    const { name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff, pickupMileage, dropoffMileage } = req.body;

    // Ensure fields are numbers
    const validPickupMileage = Number(pickupMileage);
    const validDropoffMileage = Number(dropoffMileage);

    if (isNaN(validPickupMileage) || isNaN(validDropoffMileage)) {
      return res.status(400).send('Pickup and Dropoff Mileage must be valid numbers');
      console.log('Request Body:', req.body);

    }

    // Calculate Total Mileage
    const totalMileage = Math.abs(validDropoffMileage - validPickupMileage);

    const transport = new Transport({
      name,
      mobility,
      consent,
      dnar,
      respectForm,
      bariatric,
      pickup,
      dropoff,
      pickupMileage: validPickupMileage,
      dropoffMileage: validDropoffMileage,
      totalMileage,
    });

    await transport.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);

    // Check if it's a validation error
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).send(`Validation Error: ${errors.join(', ')}`);
    }

    res.status(500).send('Error creating transport');
  }
};

// Show edit form
exports.getEditForm = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (!transport) {
      return res.status(404).send('Transport not found');
    }
    res.render('form', { transport });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching transport');
  }
};

// Update transport
exports.updateTransport = async (req, res) => {
  try {
    const { name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff, pickupMileage, dropoffMileage } = req.body;

    // Calculate Total Mileage
    const totalMileage = Math.abs(Number(dropoffMileage) - Number(pickupMileage));

    await Transport.findByIdAndUpdate(req.params.id, {
      name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff, pickupMileage, dropoffMileage, totalMileage,
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating transport');
  }
};

// Delete transport
exports.deleteTransport = async (req, res) => {
  try {
    await Transport.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting transport');
  }
};