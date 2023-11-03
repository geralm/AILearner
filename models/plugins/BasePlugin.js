const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const basePluginSchema = new Schema({
    title: {
        type: String,
        require:true,
        unique: true
    },
    description:{
        type: String,
        require:true,
    },
    unlock_level:{
        type: Number,
        require: true,
    },
    accessibleRooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room',
        require:true,
    }],
});
// Middleware para actualizar updated_at antes de cada save o update

module.exports = mongoose.model('base_plugin', basePluginSchema);

// Model for the user notes