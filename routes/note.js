const express = require('express');
const router  = express.Router();
const catchAsync = require('../utils/catchAsync');
const {getAllNotes,deleteNote, updateNote, createNote} = require('../controllers/note')
const {isLoggedInApi,validateNote } = require('../middlewares/middleware');
//TODO import logging and then passing throught middleware

router.route('/')
    .get(isLoggedInApi,catchAsync(getAllNotes))
    .post(isLoggedInApi,catchAsync(createNote));
router.route('/:id')
    .put(isLoggedInApi, catchAsync(updateNote))
    .delete(isLoggedInApi,catchAsync(deleteNote));
//TODO add middleware isAuthor
//TODO add middleware isValidNote
//TODO: Define rest of the routes

module.exports = router