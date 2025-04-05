const MONGODB_URI = process.env.MONGO_URI;
const mongoose=require('mongoose');

const connection=mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
