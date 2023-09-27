const {app }= require('./expressConfig');
const roomsRoutes = require('./routes/rooms');



app.use('/room', roomsRoutes);
app.get('/', (req, res) => {
    res.render('home');
});
// app.all('*')
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});