const express = require("express");
const { Server } = require("socket.io");
const http=require("http")

const port=3000
const app=express()
const server = http.createServer(app);

const io=new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"],
    credentials:true
  }
})

app.get("/",(req,res)=>{
  res.send("Hello world")
})

 io.on("connection",(socket)=>{
  console.log(`a user connected ${socket.id}`)
  // socket.emit("welcome",`welcome to user ${socket.id}`)
  // socket.broadcast.emit("welcome",`${socket.id} joined the server`)
  
  socket.on("message",(data)=>{
    console.log(`Message received : ${data}`);
  })
   
  socket.on("disconnect",()=>{
    console.log(`user disconnected ${socket.id}`);
  })

 })

server.listen(port,()=>{
    console.log(`Server is running on ${port}`)
} )