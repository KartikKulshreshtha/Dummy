const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Tag = require('../models/Tag');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Get all available rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({ available: true });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/create', async (req, res) => {
  const { name, capacity, tags, available = true } = req.body; 

  if (!name || !capacity) {
    return res.status(400).json({ message: 'Missing required fields: name and description' });
  }

  const newRoom = new Room({
    name,
    capacity,
    tags,
    available, 
  });

  try {
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
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

router.get('/:id/bookings', async (req, res) => {
  const roomIdString = req.params.id;

  try {
    if (!ObjectId.isValid(roomIdString)) {
      return res.status(400).json({ message: 'Invalid room ID' });
    }

    const roomId = new ObjectId(roomIdString);
    const bookings = await Booking.find({ roomId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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

router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { start, end } = req.query; 


    const bookings = await Booking.find({
      roomId: room._id,
      $or: [
        { start: { $lt: end }, end: { $gt: start } }, 
        { start: { $gt: end } }, 
        { end: { $lt: start } }, 
      ],
    });

    const availableRooms = rooms.filter((room) => !bookings.some((booking) => booking.roomId.equals(room._id)));
    res.json(availableRooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;