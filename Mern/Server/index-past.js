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
//C R U D
//create
server.post("/products",(req,res)=>{//->data is added through post method
    console.log(req.body)
   products.push(req.body)
   res.json(req.body)
})

//Read
server.get("/:id",(req,res)=>{ //-->auth on a particular route
    console.log(req.params)//->/hi --> req.params=> {id: "hi"}
   res.json({type:"get"})
})
server.get('/products/:id',(req,res)=>{ 
    let id = parseInt(req.params.id);
    res.send(products[id])
})
//UPDATE
server.put('/products/:id',(req,res)=> {//-> overwirtes whole data
    const id=+req.params.id;
    const productIndex=products.findIndex(p=>p.id==id)
    products.splice(productIndex,1,{...req.body,id:id})
    res.status(201).send("done")
})
server.patch('/products/:id',(req,res)=> {//-> overwirtes some part of data (updates it)
    const id=+req.params.id;
    const productIndex=products.findIndex(p=>p.id==id)
    const product=products[productIndex]
    products.splice(productIndex,1,{ ...product,...req.body})//->product will have whole data , now whatever req.body has it over wirtes it
    res.status(201).send("done")
})
//DELETE
server.delete('/products/:id',(req,res)=> {//-> overwirtes some part of data (updates it)
    const id=+req.params.id;
    const productIndex=products.findIndex(p=>p.id==id)
    const product=products[productIndex]
    products.splice(productIndex,1)//->product will have whole data , now whatever req.body has it over wirtes it
    res.status(201).send("done")
})





//
// server.post("/",(req,res)=>{
//     res.json({type:"get"})
//  })
//  server.delete("/",(req,res)=>{
//     res.json({type:"get"})
//  })

server.listen(8080,()=>{
    console.log("server connected to ",8080)
})