const { error } = require('console');
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set("view engine","ejs");

// app.use(express.static(path.join(__dirname,"public")))
app.use(express.static('./public'))
app.get('/', (req, res) => {
  res.render("index",{Navbar:"MySite"})
})
app.get('/error', (req, res,next) => {
  throw Error("");
})
app.get('/contact', (req, res) => {
  res.render("contact")
}) 

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname,"index.html"))
})
app.get('/json', (req, res) => {
    res.json({"Harry":34 })
  })
  app.get('/home/:name', (req, res) => {
   res.send("Hello "+req.params.name)
  })

  function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  }
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})