const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {renderRoom , fetchQuestionFromAPIs, renderHall } = require('../controllers/rooms');
const {isLoggedIn} = require('../middlewares/middleware');
//TODO: improve the rooms home page logic
// router.route('/') 
//     .get(catchAsync());
router.route('/hall')
    .get(isLoggedIn,catchAsync(renderHall));
router.route('/:id')
    .get(isLoggedIn,catchAsync(renderRoom))
    .post(isLoggedIn,catchAsync(fetchQuestionFromAPIs));
//TODO: add middleware to check if the user is logged in
module.exports = router;
