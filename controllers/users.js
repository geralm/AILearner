const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}
module.exports.register = async (req, res, next) => {
    //TODO: Redirect to user selected room
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome!');
            res.redirect(`/room/${"6514aa8725e5b7bac35786dc"}`);
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}
module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}
module.exports.login = (req, res) => {
   
    req.flash('success', '¡Welcome again!');
    var redirectUrl = req.session.returnTo || '/room/6514aa8725e5b7bac35786dc';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}
module.exports.logout = (req, res) => {
    return new Promise((resolve, reject) => {
        req.logout((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
        .then(() => {
            req.flash('success', "¡Goodbye!");
            res.redirect('/');
        })
        .catch((err) => {
            // Maneja el error de req.logout() si es necesario
            console.error(err);
            // Redirige al usuario a una página de error o a donde sea necesario.
            res.redirect('/error');
        });
}