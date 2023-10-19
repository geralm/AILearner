const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const usersControlers = require('../controllers/users');

router.route('/register')
    .get(usersControlers.renderRegister)
    .post(catchAsync(usersControlers.register));
router.route('/login')
    .get(usersControlers.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), usersControlers.login);
router.get('/logout', usersControlers.logout);

module.exports = router;