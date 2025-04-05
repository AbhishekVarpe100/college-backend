const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const noticeSchema=new Schema({
    notice:{
        type:String,
        required:true,
    }
})

const Notice=mongoose.model('Notice',noticeSchema);
module.exports=Notice;


















