const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path')

// MONGO DB CONNECTION
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/ai-learner'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));   // if error occurs
db.once("open", () => { console.log("Database connected"); }); // if connection is successful

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method')); // to use PUT and DELETE requests
app.use(express.static(path.join(__dirname, 'public'))); // to serve static files
//mongoSanitiza inyection

///Sesion cofing

module.exports.app = app;