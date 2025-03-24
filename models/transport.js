const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobility: { type: String, required: true },
  consent: { type: String, required: true },
  dnar: { type: String, required: true },
  respectForm: { type: String, required: true },
  bariatric: { type: String, required: true },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  pickupMileage: { type: Number, required: true },
  dropoffMileage: { type: Number, required: true },
  totalMileage: { type: Number, required: true }
});

const Transport = mongoose.model('Transport', transportSchema);
module.exports = Transport;
