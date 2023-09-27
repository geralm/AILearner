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
    room:{
        type: Schema.Types.ObjectId,
        ref: 'Room',
        require:true
    }
});
module.exports = mongoose.model('Note', noteSchema);

// Model for the user notes