const mongoose = require("mongoose");

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
  // New time fields:
  pickupTime: Date,
  dropoffTime: Date,
  duration: Number, // duration in minutes (calculated on creation/update)
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Associates transport with a user
});

module.exports = mongoose.model("Transport", transportSchema);
