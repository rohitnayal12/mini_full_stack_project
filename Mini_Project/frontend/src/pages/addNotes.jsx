import React, { useState } from 'react'

function AddNotes() {
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")

  
  
  const handlesubmit=()=>{
  
    const payload={
      title,
      body
    }
    console.log(payload)
    fetch("https://notes-app-3xdm.onrender.com/notes/create",{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
        "Content-type":`application/json`

      },
      body:JSON.stringify(payload)
    })
    
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      console.log(data)
      alert("Notes Added Successfully.")
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  
  
    return (
      <div>
        <h3>Add Notes Page</h3>
        <input type="text" placeholder='Your Notetitle' value={title}  onChange={(e)=>{setTitle(e.target.value)}}/>
        <input type="text" placeholder='Your Notebody' value={body} onChange={(e)=>{setBody(e.target.value)}} />
        
        <button  onClick={handlesubmit}>Submit</button>
      </div>
    )
}

export default AddNotes