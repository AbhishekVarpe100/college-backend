const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the blog schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

// Create the user model
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;