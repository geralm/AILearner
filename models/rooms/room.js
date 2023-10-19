const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    bot_role: { // AI Role in the room
        type:String,
        require: true
    },
    description: {
        type: String,
        require: true,
    }
  

});

module.exports = mongoose.model('Room', roomSchema);