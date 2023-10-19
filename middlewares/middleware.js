const ExpressError = require('../utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}
module.exports.isLoggedInApi = (req, res, next) => {
    //This middleware is used for the API because do not redirect to login page in server side
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first!');
        return res.status(401).json({ error: 'You must be signed in first!' });
    }
    next();
}
module.exports.validateNote = (req, res, next) => {
    const { error } = noteSchema.validate(req.body);
    if (error) {

        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}

//TODO: validatations
//TODO: isAuthor note validadtion