const express = require('express')
const fs=require("fs")
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/about', (req, res) => {
    res.send('This is About')
  })
app.get('/home', (req, res) => {
    const a=fs.readFileSync('./home.html')
    res.send(a.toString());   
    
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})