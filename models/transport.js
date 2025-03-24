const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobility: { type: String, required: true },
  consent: { type: Boolean, required: true },
  dnar: { type: Boolean, required: true },
  respectForm: { type: Boolean, required: true },
  bariatric: { type: Boolean, required: true },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  pickupMileage: { type: Number, required: true },
  dropoffMileage: { type: Number, required: true },
  totalMileage: { type: Number, required: true },
}, { timestamps: true });

const Transport = mongoose.model('Transport', transportSchema);
module.exports = Transport;
