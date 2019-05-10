const {Schema, model} = require('mongoose');
const uuid = require ("uuid")
const UserSchema = new Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    leagues: [{type: Schema.Types.ObjectId}],
    created: {
        type:Date,
        required: true
    }
});


const Session = new Schema({
    user:{type: Schema.Types.ObjectId,required: true},
    key: {type: String, default: uuid()},
    created: {type: Date, default:Date.now()}
});

module.exports.User = model('user',  UserSchema);
module.exports.Session = model('session', Session);