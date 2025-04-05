const express=require('express');
const http=require('http');
const app=express();
const server=http.createServer(app)
const Msg=require('./models/Messages')
require('./Connection')
const io=require('socket.io')(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"], 
        allowedHeaders:["my-custom-header"],
        credentials:true
    }
});


const cors=require('cors')

app.use(cors())

io.on('connection', (socket) => {
    console.log("Socket is active");

    socket.on('chat', async (payload) => {
        console.log("Payload:", payload);

        // Save the message to the database
        const date=new Date()
        const curr_time=date.toTimeString().split(' ')[0];
        const msg = new Msg({ username: payload.username, msg: payload.msg ,by:'user',time:curr_time});
        await msg.save();

        // Emit the message to all connected clients
        io.emit('chat', payload);
    });

    socket.on('adminreply',async (payload)=>{
        const date=new Date()
        const curr_time=date.toTimeString().split(' ')[0];
        const msg = new Msg({username:payload.username,reply:payload.message,by:'admin',time:curr_time})
        await msg.save();
        io.emit('chat',payload);
    })


    socket.on('delete_msg',async (payload)=>{
        await Msg.findByIdAndUpdate(payload.id,{$set:{deleted:true}});
        io.emit('chat');
    })

    // Handle socket disconnection if needed
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(5000,()=>{
    console.log('Server is active at port 5000')
})