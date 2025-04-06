const mongoose=require('mongoose')
const userLocationSchema = new mongoose.Schema({
    ip: { type: String, unique: true },
    city: String,
    region: String,
    country: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });

  const Location=mongoose.model("Location",userLocationSchema)
  module.exports=Location
  