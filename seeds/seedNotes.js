const mongoose = require("mongoose");
const Notes = require('../models/note');
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedRooms = async()=>{
    await Notes.deleteMany({});
    // const note = new Notes({
    //     title: "Analisis de de II Guerra Mundial",
    //     content: "El holocausto fue...",
    //     author: "65254d15aa774d85a65cc7db"
    // });

    // await note.save();
    console.log("note created");
}
seedRooms().then(() => {
    mongoose.connection.close();
})