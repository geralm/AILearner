const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatRoom_id: {
        type: Schema.Types.ObjectId,
        ref: 'ChatRoom',
    },
    message: {
        type: String,
        require: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    posted_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});
module.exports = mongoose.model('Message', messageSchema);