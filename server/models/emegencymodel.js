// models/emergency.js
const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String,
  location: String,
  notes: String,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Emergency', emergencySchema);
