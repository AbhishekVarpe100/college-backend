const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the subject schema
const subSchema = new Schema({
    sub_name: {
        type: String,
        required: true,
    },
    marks: {
        type: String,
        required: true,
    },
});

// Create the user model
const Subject = mongoose.model('Subject', subSchema);
module.exports = Subject;