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
  fetch("https://notes-app-3xdm.onrender.com/users/register",{
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
    alert("New user has been registered successfully.")
    
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