const mongoose = require("mongoose");
const User = require("../models/user");
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {console.log("Database connected");});

const seedUser = async()=>{
    await User.deleteMany({});
    const user = new User({
        email: "system@gmail.com",
        username: "system"
        });
    await user.save();
    console.log("User created");
};
seedUser().then(() => {
    mongoose.connection.close();
});
