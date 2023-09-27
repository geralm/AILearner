const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membershipXUserSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    membership: {
        type: Schema.Types.ObjectId,
        ref: 'Membership',
    },
    startDate: {
        type: Date,
        require: true,
    },
    expirationDate:{
        type: Date,
        require: true,
    },
    expired:{
        type: Boolean,
        require: true,
        default: false,
    }
    
});