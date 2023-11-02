const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    roomType: { // AI Role in the room
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    users_ids: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
});
module.exports = mongoose.model('ChatRoom', chatRoomSchema);