const express = require("express");
const router = express.Router();
const path=require('path');
const multer=require('multer');
const User = require('../models/User');
const fs=require('fs');
const Staff=require('../models/Staff');
const connection=require('../Connection');
const Placement = require("../models/Placements");
const Blog = require('../models/Blog');
const Video = require("../models/Video");

const cloudinary = require('cloudinary').v2;

const {storage3}=require('../config/Blog_Images');
const { storage5 } = require("../config/Videos");
const { storage4 } = require("../config/Placement_Images");
const { storage2 } = require("../config/Profile_Images");



const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "Public/Profile_Images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload=multer({storage:storage2})


router.post('/upload_photo',upload.single('file'),async (req,res)=>{
    if(req.body.type=='student'){
        await User.updateOne({_id:req.body.id},{$set:{photo:req.file.path}});
        res.json('uploaded');
        console.log(req.body)
    }
    else if(req.body.type=='staff'){
        await Staff.updateOne({_id:req.body.id},{$set:{photo:req.file.path}});
        res.json('uploaded');
    }
})

router.post('/edit_photo',upload.single('file'),async (req,res)=>{
    if(req.body.type=='student'){

       const file= await User.findOne({_id:req.body.id},{photo:1,_id:0})

        fs.unlink(`Public/Profile_Images/${file.photo}`,(err)=>{
            if(err){
                console.log("Something wrong");
            }
            console.log("File deleted");
        });
        await User.updateOne({_id:req.body.id},{$set:{photo:req.file.filename}});
        // console.log(file.photo);
        res.json('uploaded');

    }
    else if(req.body.type=='staff'){
        const file= await Staff.findOne({_id:req.body.id},{photo:1,_id:0})

        fs.unlink(`Public/Profile_Images/${file.photo}`,(err)=>{
            if(err){
                console.log("Something wrong");
            }
            console.log("File deleted");
        });
        await Staff.updateOne({_id:req.body.id},{$set:{photo:req.file.filename}});
        // console.log(file.photo);
        res.json('uploaded');
    }
    
})




const placement_upload=multer({storage:storage4})

router.post('/create_placement',placement_upload.single('file'),async(req,res)=>{
    const {name,package_,company}=req.body;
    const file=req.file.path;
    const newPlacement=new Placement({name,package_,photo:file,company});
    newPlacement.save();
    res.json("created");
})



const uploadBlog=multer({storage:storage3})


router.post('/add_blog',uploadBlog.single('file'),async(req,res)=>{
    const {title,description}=req.body;
    const file=req.file.path;
    const blog= new Blog({title,description,image:file});
    blog.save();
    res.json("blog created");
})



const video_storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "Public/Videos")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const video_upload=multer({storage:storage5})

router.post('/add_video',video_upload.single('file'),(req,res)=>{
    const file=req.file.path;
    // const nameArr=file.split(".");

    if(!req.file){
        res.json({message:'file not uploaded'})
    }
        const newVideo=new Video({title:req.body.title,video:file});
        newVideo.save();
        res.json({message:'Video added'});
    
})


    
module.exports=router;

