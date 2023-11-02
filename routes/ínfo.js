const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {renderInfo } = require('../controllers/info');
//TODO: improve the rooms home page logic
// router.route('/') 
//     .get(catchAsync());
router.route('/')
    .get(renderInfo)
    
//TODO: add middleware to check if the user is logged in
module.exports = router;
