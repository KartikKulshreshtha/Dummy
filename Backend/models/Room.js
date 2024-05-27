const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  available: { type: Boolean, default: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
});

module.exports = mongoose.model('Room', roomSchema);