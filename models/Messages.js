const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the blog schema
const msgSchema = new Schema({
    username: {
        type: String,
    },
    msg: {
        type: String,
    },
    reply:{
        type: String,
    },
    by:{
        type :String,
    },
    deleted:{
        type:Boolean,
        default:false
    },
    time:{
        type:String
    }
});

// Create the user model
const Messages = mongoose.model('Messages', msgSchema);
module.exports = Messages;