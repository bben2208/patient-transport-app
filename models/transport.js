const mongoose = require('mongoose');

// Define Transport Schema
const transportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobility: {
    type: String,
    required: true,
    enum: ['own chair', 'str', 'walker', 'none'], // Ensures valid options
  },
  consent: {
    type: String,
    required: true,
    enum: ['yes', 'no'], // Ensures only 'yes' or 'no' values
  },
  dnar: {
    type: String,
    required: true,
    enum: ['yes', 'no'],
  },
  respectForm: {
    type: String,
    required: true,
    enum: ['yes', 'no'],
  },
  bariatric: {
    type: String,
    required: true,
    enum: ['yes', 'no'],
  },
  pickup: {
    type: String,
    required: true,
    trim: true,
  },
  dropoff: {
    type: String,
    required: true,
    trim: true,
  },
  pickupMileage: {
    type: Number,
    required: true,
    min: 0,
  },
  dropoffMileage: {
    type: Number,
    required: true,
    min: 0,
  },
  totalMileage: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Pre-save hook to calculate totalMileage
transportSchema.pre('save', function (next) {
  this.totalMileage = Math.abs(this.dropoffMileage - this.pickupMileage);
  next();
});

// Create Model
const Transport = mongoose.model('Transport', transportSchema);

module.exports = Transport;
