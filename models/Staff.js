const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the staff schema
const staffSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    photo:{
        type:String,
    }
});

// Create the user model
const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;