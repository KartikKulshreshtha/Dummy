const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Tag = require('../models/Tag');

// Get all available rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({ available: true });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new booking for a room
router.post('/:id/bookings', async (req, res) => {
  const roomId = req.params.id;
  const { start, end, userId } = req.body;

  const newBooking = new Booking({
    roomId,
    start,
    end,
    userId,
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all bookings for a room
router.get('/:id/bookings', async (req, res) => {
  const roomId = req.params.id;

  try {
    const bookings = await Booking.find({ roomId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new tag
router.post('/tags', async (req, res) => {
  const { name, description } = req.body;

  const newTag = new Tag({
    name,
    description,
  });

  try {
    const savedTag = await newTag.save();
    res.status(201).json(savedTag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;