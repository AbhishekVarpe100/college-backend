const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const admissionSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    percent_10th:{
        type :String,
        required:true,
    },
    percent_12th:{
        type:String,
        required:true,
    },
    status:{
        type:String,
    }
})

const Admission=mongoose.model('Admission',admissionSchema);
module.exports=Admission;


















