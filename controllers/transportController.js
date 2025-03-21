const transport = require('../models/transport');

// Show all transports
exports.getAllTransports = async (req, res) => {
  const transports = await transport.find({});
  res.render('index', { transports });
};

// Show create form
exports.getCreateForm = (req, res) => {
  res.render('form', { transport: null });
};

// Create a new transport
const Transport = require('../models/transport');

// Create a new transport
exports.createTransport = async (req, res) => {
  try {
    const { name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff,pickupMilage,dropoffMileage,totalMileage } = req.body;
    await Transport.create({ name, mobility, consent, dnar, respectForm, bariatric, pickup, dropoff });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating transport');
  }
};



// Show edit form
exports.getEditForm = async (req, res) => {
  const transport = await Transport.findById(req.params.id);
  res.render('form', { transport });
};

// Update transport
exports.updateTransport = async (req, res) => {
  try {
    const { name, pickup, dropoff, mobility,pickupMilage,dropoffMileage,totalMileage } = req.body;
    await Transport.findByIdAndUpdate(req.params.id, { name, pickup, dropoff, mobility });
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
    res.status(500).send('Error deleting transport');
  }
};
