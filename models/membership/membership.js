const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membershipSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room',
        }
    ],
    days: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    }
});
