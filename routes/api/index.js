const express = require('express');
const router = express.Router();

router.use('/monsters', require('./monsters'));

module.exports = router;