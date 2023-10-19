const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {renderRoom} = require('../controllers/rooms');
//TODO: improve the rooms home page logic
// router.route('/') 
//     .get(catchAsync());
router.route('/:id')
    .get(catchAsync(renderRoom));
//TODO: add a route to post a question
//TODO: add middleware to check if the user is logged in
module.exports = router;
