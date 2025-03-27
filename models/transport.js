const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobility: { type: String, required: true },
  consent: { type: String, required: true },
  dnar: { type: String, required: true },
  respect_form: { type: String, required: true },
  bariatric: { type: String, required: true },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  pickup_mileage: { type: Number, required: true },
  dropoff_mileage: { type: Number, required: true },
  total_mileage: { type: Number, required: true }
});

module.exports = mongoose.model('Transport', transportSchema);