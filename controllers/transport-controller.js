const Transport = require('../models/transport');

exports.getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.find();
    res.render('index', { transports });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching transports');
  }
};

exports.getCreateForm = (req, res) => {
  res.render('form', { transport: null });
};

exports.createTransport = async (req, res) => {
  try {
    const { name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff, pickupMileage, dropoffMileage } = req.body;
    const validPickupMileage = Number(pickupMileage);
    const validDropoffMileage = Number(dropoffMileage);
    if (isNaN(validPickupMileage) || isNaN(validDropoffMileage)) {
      return res.status(400).send('Invalid mileage values');
    }
    const totalMileage = Math.abs(validDropoffMileage - validPickupMileage);
    const transport = new Transport({ name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff, pickupMileage: validPickupMileage, dropoffMileage: validDropoffMileage, totalMileage });
    await transport.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating transport');
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (!transport) return res.status(404).send('Transport not found');
    res.render('form', { transport });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching transport data');
  }
};

exports.updateTransport = async (req, res) => {
  try {
    const { name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff, pickupMileage, dropoffMileage } = req.body;
    const totalMileage = Math.abs(Number(dropoffMileage) - Number(pickupMileage));
    await Transport.findByIdAndUpdate(req.params.id, {
      name,
      mobility,
      consent,
      dnar,
      respectForm,
      bariatric,
      pickup,
      dropoff,
      pickupMileage: Number(pickupMileage),
      dropoffMileage: Number(dropoffMileage),
      totalMileage
    });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating transport');
  }
};

exports.deleteTransport = async (req, res) => {
  try {
    await Transport.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting transport');
  }
};
