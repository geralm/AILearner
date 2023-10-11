const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        require:true,
    },
    content:{
        type: String,
        require:true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require:true,
    },
    chatroom:{
        type: Schema.Types.ObjectId,
        ref: 'chatroom',
        require:true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('Note', noteSchema);

// Model for the user notes