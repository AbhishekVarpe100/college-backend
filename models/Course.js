const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the course schema
const courseSchema = new Schema({
    course_name: {
        type: String,
        required: true,
    },
    fees: {
        type: String,
        required: true,
    },
    perYearFees:{
        type:String,
        required:true,
    },
});

// Create the user model
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;