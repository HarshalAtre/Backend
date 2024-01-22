const express=require("express")
const server=express()
const morgan=require("morgan")
const fs=require('fs')

const data=JSON.parse(fs.readFileSync("data.json","utf-8"))
const products=data.products;

//middle-ware
server.use(function timeLog (req, res, next) {
    console.log(req.method,req.baseUrl,req.ip,req.hostname)
    next();
    });
server.use(morgan('default'))//->logger to log imp observation(third party)
const auth= (req,res,next)=>{
    if(req.query.password=="123"){
        console.log('logged in')
        next()
    }
    else{
        res.sendStatus(401)
    }
}
// server.use(auth)//-->auth on all routes
server.use(express.json())//->parse json data in body 

server.use(express.static("public"))//->serves index.html on "/" path and if we want demo.html we use "/demo.html" , it can also servev json,image


//Api-endpoints-routes

//Read
server.get("/:id",(req,res)=>{ //-->auth on a particular route
    console.log(req.params)//->/hi --> req.params=> {id: "hi"}
   res.json({type:"get"})
})
server.get('/products/:id',(req,res)=>{ 
    let id = parseInt(req.params.id);
    res.send(products[id])
})

// server.post("/",(req,res)=>{
//     res.json({type:"get"})
//  })
//  server.delete("/",(req,res)=>{
//     res.json({type:"get"})
//  })

server.listen(8080,()=>{
    console.log("server connected to ",8080)
})