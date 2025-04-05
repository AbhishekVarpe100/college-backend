const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the contact schema
const contactSchema = new Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    course: {
        type: String,
    },
    message: {
        type: String,
    },
    username:{
        type:String,
    },
    user_email:{
        type:String,
    },

    timestamp: { type: String, },
    
    admin_reply :{
        type:String,
    },
    
});

// Create the user model
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;