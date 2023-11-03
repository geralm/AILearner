const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pluginSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require:true,
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        require:true
    },
    base_plugin: { 
        type: Schema.Types.ObjectId,
        ref: 'base_plugin'
    }
});

module.exports = mongoose.model('Plugin', pluginSchema);

// Model for the user notes