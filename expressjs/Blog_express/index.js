
const express = require('express')
const path = require('path')
const app = express()
const port = 3000
app.use(function(req,res,next){
    console.log("Hi");
    next()
})
// app.use(express.static(path.join(__dirname,"public")))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"index.html"))
})
app.get('/json', (req, res) => {
    res.json({"Harry":34 })
  })
  app.get('/home/:name', (req, res) => {
   res.send("Hello "+req.params.name)
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})