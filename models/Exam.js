const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Define the Exam schema

const examSchema=new Schema({
    username:{
        type : String,
        required:true,
    },
    email:{
        type : String,
        required:true,
    },
    name:{
        type : String,
        required:true,
    },
    course :{
        type:String,
        required:true,
    },

    prn:{
        type:String,
        required:true,
    },

    sub1:{
        type:String,
        required:true,
    },
    sub2:{
        type:String,
        required:true,
    },
    sub3:{
        type:String,
        required:true,
    },
    sub4:{
        type:String,
        required:true,
    },
    sub5:{
        type:String,
        required:true,
    },
    sub6:{
        type:String,
        required:true,
    },
    sub7:{
        type:String,
        required:true,
    },
    hallticket_status:{
        type:Boolean,
    },
    result_status:{
        type:Boolean,
    },
})

const Exam=mongoose.model('Exam',examSchema);
module.exports=Exam;
