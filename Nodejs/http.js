const http =require('http');
const fs=require("fs")
const port=process.env.PORT||3000;
const server  =http.createServer((req,res)=>{
   if(req.url=="/home"){
    res.statusCode=200;
    res.setHeader('Content-Type','text/html')
    const a=fs.readFileSync('./home.html')
    res.end(a.toString());
   }
   else{
    res.statusCode=404;
    res.end( " <h1> Error 404 Not Found </h1>"); 
   } 

})
server.listen(port,()=>{
    console.log(`Server is listening to port ${port}`)
})