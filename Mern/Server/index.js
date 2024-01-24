require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose=require("mongoose")
const server = express();
const cors=require("cors")
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
const {Schema}=mongoose
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.MONGO_URL)
server.use((req,res,next)=>{
  try{
    const token=req.get('Authorization').split("Bearer ")[1]
    console.log(token)
    const decoded=jwt.verify(token,"secret")
    console.log(decoded)
    if(decoded.email){
      next()
    }
  }
  catch(err){
    res.status(401).send({message:"You are not logged in!"})
  }

})
//bodyParser
server.use(cors())
server.use(express.json()); 
server.use(morgan('default')); 
server.use(express.static(process.env.PUBLIC_DIR));
server.use('/products',productRouter.router);
server.use('/users',userRouter.router);
server.use("*",(req,res)=>{
res.sendFile(__dirname+"/build/index.html")
})

server.listen(process.env.PORT, () => {
  console.log('server started');
});

//schema
