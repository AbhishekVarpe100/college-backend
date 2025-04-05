const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Define the Exam schema

const pdfSchema=new Schema({
    username:{
        type : String,
        required:true,
    },
    email:{
        type : String,
        required:true,
    },
    pdfFile:{
        type : String,
        required:true,
    }
})

const HallTicket=mongoose.model('HallTicket',pdfSchema);
module.exports=HallTicket;
