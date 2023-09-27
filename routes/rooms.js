const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {renderRoom} = require('../controllers/rooms');
router.route('/') 
    .get(catchAsync());
router.route('/:id')
    .get(catchAsync(renderRoom));

module.exports = router;
