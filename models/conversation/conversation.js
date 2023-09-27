const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});