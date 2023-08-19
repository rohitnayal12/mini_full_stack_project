import React, { useState } from 'react'

function Login() {
  
  const [email,setEmail]=useState("")
  const [pass,setPass]=useState("")


const handlesubmit=()=>{

  const payload={
    email,
    pass
  }
  console.log(payload)
  fetch("http://localhost:8080/users/login",{
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
    localStorage.setItem("token", (data.token))
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
        alert("Logged In Successfully.")
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
      <h3>Login Page</h3>
      
      <input type="email" placeholder='Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
      <input type="password" placeholder='Your Password' value={pass}  onChange={(e)=>{setPass(e.target.value)}}/>
      <button  onClick={handlesubmit}>Submit</button>
    </div>
  )
}

export default Login