import React, { useState } from 'react'

function Signup() {
  const [username,setName]=useState("")
  const [email,setEmail]=useState("")
  const [pass,setPass]=useState("")


const handlesubmit=()=>{

  const payload={
    email,
    username,
    pass
  }
  console.log(payload)
  fetch("http://localhost:8080/users/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(payload)
  })
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    console.log(data)
    const handlesubmit=()=>{
  
      const payload={
        title,
        body
      }
      console.log(payload)
      fetch("http://localhost:8080/notes/create",{
        method:"POST",
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`,
          "content-type":`application/json`
  
        },
        body:JSON.stringify(payload)
      })
      
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
        console.log(data)
        alert("Registered Successfully.")
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}



  return (
    <div>
      <h3>Registration Page</h3>
      <input type="text" placeholder='Your Username' value={username}  onChange={(e)=>{setName(e.target.value)}}/>
      <input type="email" placeholder='Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
      <input type="password" placeholder='Your Password' value={pass}  onChange={(e)=>{setPass(e.target.value)}}/>
      <button  onClick={handlesubmit}>Submit</button>
    </div>
  )
}

export default Signup