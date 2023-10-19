if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path')
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

// MONGO DB CONNECTION
const dbUrl = process.env.DB_URL || `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`
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
app.use(methodOverride('_method')); // to use PUT and DELETE requests
app.use(express.static(path.join(__dirname, 'public'))); // to serve static files
//mongoSanitiza inyection

///Sesion cofing
const sessionConfig = {
secret: 'jfusdc9ds83n23n4jfs98dfsd88c898f98s8f88sd98',//process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, //to prevent cookie to be accessed by client side script
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

//passport config
app.use(passport.initialize());
app.use(passport.session()); // to use session to keep user logged in
passport.use(new LocalStrategy(User.authenticate())); // to use local strategy
passport.serializeUser(User.serializeUser()); // to serialize user
passport.deserializeUser(User.deserializeUser()); // to deserialize user
app.use(express.json());
//

module.exports.app = app;