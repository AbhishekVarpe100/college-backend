const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const status=require('express-status-monitor')
const compression=require('compression')
// const morgan =require('morgan');
app.use(compression())
app.use(status())
app.use(cors())
require('dotenv').config()
app.use(bodyParser.json());
app.use(express.static('Public'));
// app.use(morgan())


// app.use((req,res,next)=>{
//     console.log("Request URL"+ req.url)
//     next()
// })




require('./Connection')

const userRoutes=require('./routes/UserRoutes');
// const staffRoutes=require('./routes/StaffRoutes');
const uploadRoutes=require('./routes/UploadRoutes');

app.use(userRoutes)
// app.use(staffRoutes)
app.use(uploadRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`App listening on port ${process.env.PORT}`)
})


