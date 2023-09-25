const {app }= require('./expressConfig');


app.get('/', (req, res) => {
    res.render('home');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});