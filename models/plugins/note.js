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
    updated_at: {
        type: Date,
        default: Date.now()        
    },
    plugin:{
        type: Schema.Types.ObjectId,
        ref: 'Plugin', 
        require: true
    },
    room:{
        type:Schema.Types.ObjectId,
        ref: 'Room',
        require: true,
    }
});
// Middleware para actualizar updated_at antes de cada save o update
noteSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

noteSchema.pre('update', function (next) {
    this.update({}, { $set: { updated_at: new Date() } });
    next();
});
module.exports = mongoose.model('Note', noteSchema);

// Model for the user notes