const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    body: {
        type: String,
        require:true,
    },
    author: {
        type: String,
        enum: ['user', 'bot'],
        require:true,
    }
});
module.exports = mongoose.model('Message', messageSchema);