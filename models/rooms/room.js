const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    bot_role: { // AI Role in the room
        type:String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    conversations: [{
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    }],

});

module.exports = mongoose.model('Room', roomSchema);