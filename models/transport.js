const mongoose = require("mongoose");
const Transport = require('../model/transport');

const transportSchema = new mongoose.Schema({
  name: String,
  mobility: String,
  consent: String,
  dnar: String,
  respectForm: String,
  bariatric: String,
  pickup: String,
  pickupMileage: Number,
  dropoff: String,
  dropoffMileage: Number,
  totalMileage: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Associates transport with a user
});

module.exports = mongoose.model("Transport", transportSchema);
