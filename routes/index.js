const router = require('express').Router();
const { Server } = require('http');
const { connection } = require('mongoose');
const { config } = require('process');
const thought = require('../controllers/thought');
const apiRoutes = require('./routes/api');
router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
