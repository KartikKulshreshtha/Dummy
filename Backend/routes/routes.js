const express = require('express');
const router = express.Router();
const roomRoutes = require('./roomRoutes');

router.use('/rooms',roomRoutes);

module.exports = router;