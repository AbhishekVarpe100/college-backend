const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Define the Result schema

const resultSchema=new Schema({
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
    sub1m:{
        type:String,
        required:true,
    },
    sub2:{
        type:String,
        required:true,
    },
    sub2m:{
        type:String,
        required:true,
    },
    sub3:{
        type:String,
        required:true,
    },
    sub3m:{
        type:String,
        required:true,
    },
    sub4:{
        type:String,
        required:true,
    },
    sub4m:{
        type:String,
        required:true,
    },
    sub5:{
        type:String,
        required:true,
    },
    sub5m:{
        type:String,
        required:true,
    },
    sub6:{
        type:String,
        required:true,
    },
    sub6m:{
        type:String,
        required:true,
    },
    sub7:{
        type:String,
        required:true,
    },
    sub7m:{
        type:String,
        required:true,
    },
    total:{
        type:String,
        required:true,
    },
    percent:{
        type:String,
        required:true,
    },
    result:{
        type:String,
        required:true,
    },
    result_file:{
        type:String,
        required:true,
    }
   
})

const Result=mongoose.model('Result',resultSchema);
module.exports=Result;
