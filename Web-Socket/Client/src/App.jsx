import React, { useEffect } from 'react'
import {io} from "socket.io-client"
function App() {
const socket =io("http://localhost:3000/")
 
const handlesubmit=(e)=>{
  e.preventDefault()
socket.emit("message")
}
useEffect(()=>{

  socket.on("connect",()=>{
    console.log("connected")
  })
  socket.on("welcome",(s)=>{
    console.log(s)
  })

  return ()=>{ //-->disconnects when we reload , as it returns only then
    socket.disconnect();
  }
},[])
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <input type="text"/>
        <button type='submit'>send</button>
      </form>
    </div>
  )
}

export default App
