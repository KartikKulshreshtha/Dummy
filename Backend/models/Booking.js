const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);