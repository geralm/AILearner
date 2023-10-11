const express = require('express');
const router  = express.Router();
const catchAsync = require('../utils/catchAsync');
const {getAllNotes,saveNotes, deleteNote} = require('../controllers/note')
const {isLoggedInApi} = require('../middlewares/middleware');
//TODO import logging and then passing throught middleware

router.route('/')
    .get(isLoggedInApi,catchAsync(getAllNotes))
    .put(isLoggedInApi,catchAsync(saveNotes))
    .delete(isLoggedInApi,catchAsync(deleteNote));
//TODO: Define rest of the routes

module.exports = router