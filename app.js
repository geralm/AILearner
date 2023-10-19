const {app }= require('./expressInit');
const roomsRoutes = require('./routes/rooms');
const noteApiRoutes = require('./routes/note');
const ExpressError = require('./utils/ExpressError')
const userRoutes = require('./routes/users');
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
app.use('/', userRoutes)
app.use('/room', roomsRoutes);
app.use('/note', noteApiRoutes);
app.get('/', (req, res) => {
    res.render('home');
});
app.all('*', (req, res, next) =>
{
    next(new ExpressError('Page not found', 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});