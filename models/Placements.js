const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the placement schema
const placementSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    package_: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    company:{
        type:String,
        required:true,
    }
});

// Create the user model
const Placement = mongoose.model('Placement', placementSchema);
module.exports = Placement;