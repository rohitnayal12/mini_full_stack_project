import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function EditNotes() {
const {id}=useParams()
const [title,setTitle]=useState("")
const [body,setBody]=useState("")
const [notes,setNotes]=useState({})
console.log(id)




useEffect(()=>{
    fetch("http://localhost:8080/notes",{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
        
      })
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
        
       const newnote=data.filter((note)=>{
        return note._id==id
       })
       
       //setNotes(newnote[0])
       setTitle(newnote[0].title)
       setBody(newnote[0].body) 
      })
      .catch((err)=>{
        console.log(err)
      })
},[])

const handlesubmit=async()=>{
  
    const payload={
      title,
      body
    }
    

    try {
    let res =  await fetch(`http://localhost:8080/notes/update/${id}`,{
      method:"PATCH",
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
        "Content-type":`application/json`

      },
      body:JSON.stringify(payload)
    })
    alert("Notes Updated Successfully.")
    } catch (error) {
      console.log(error)
    }
  
    
    // .then((res)=>{
    //   return res.json()
    // })
    // .then((data)=>{
    //   console.log(data)
    //   alert("Notes Updated Successfully.")
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
  }

console.log(notes)
  return (
    <div>
<h1>Edit notes page</h1>
        <input type="text" placeholder='Your Notetitle' value={title}  onChange={(e)=>{setTitle(e.target.value)}}/>
        <input type="text" placeholder='Your Notebody' value={body} onChange={(e)=>{setBody(e.target.value)}} />
        
        <button  onClick={handlesubmit}>Submit</button>
    </div>
  )
}

export default EditNotes