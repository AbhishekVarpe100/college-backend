const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the video schema
const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
});

// Create the user model
const Video = mongoose.model('Video', videoSchema);
module.exports = Video;