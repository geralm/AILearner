const mongoose = require("mongoose");
const Room = require("../models/rooms/room");
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
    await Room.deleteMany({});
    const qRoom = new Room({
        name: "Question Room",
        bot_role: "Eres el mejor explicando cualquier tema de una forma sencilla y entendible con las siguientes caracteristicas: ",
        description: "Ask me anything",
        conversations: [],
        img: "library.jpg"
    });
    const pRoom = new Room({
        name: "Philosophy Garden",
        bot_role: "Eres un filosofo consejero de alguien con las siguientes caracteristicas:",
        description: "Tell me something about life",
        conversations: [],
        img: "garden.jpg"
    });
    await pRoom.save();
    await qRoom.save();
    console.log("Rooms created");
}
seedRooms().then(() => {
    mongoose.connection.close();
})