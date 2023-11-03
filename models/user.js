const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');   

const UserSchema = new Schema({
    username: {
        type: String,
        require:true,
        unique:true
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    birthdate:{
        type: Date,
        require:true,
    },
    level:{
        type: Number, 
        default: 0,
    },
    exp:{
        type:Number,
        default: 0,
    }
    //usedhours
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);