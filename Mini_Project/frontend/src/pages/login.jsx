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
  fetch("https://notes-app-3xdm.onrender.com/users/login",{
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
    if (data.token==undefined) {
      // Handle error response
      console.log('Login failed. Please check your credentials.')
      alert(" Login failed.Please check your credentials.")
    }
    else{
      localStorage.setItem("token", (data.token))
      alert("Login successful.")
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