import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Notes() {
    const [notes,setNotes]=useState([])
    const[render,setReneder]=useState(false)
    
  

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
            
           setNotes(data)
            console.log(notes)
          })
          .catch((err)=>{
            console.log(err)
          })
    },[render])

    console.log(notes)
  
    const handleDelete = async(id) => {
      console.log(id)

      try {
      const  res = await   fetch(`http://localhost:8080/notes/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      setReneder(!render)
      alert("Notes Deleted Successfully.")

      } catch (error) {
       console.log(error) 
      }
    
      
      
    }
 

  

  
  
    return (
      <div>
        <h3>Notes Page</h3>
        <div>{notes.map((note)=>(
          

            <div  key={note._id} style={{border:"1px solid black",marginLeft:"150px",marginRight:"150px",marginBottom:"40px",paddingBottom:"20px"}}>
            <h4>{note.title}</h4>
            <h4>{note.body}</h4>
            <button  onClick={() => { handleDelete(note._id) }}>Delete</button> 
            <Link to={`/editnotes/${note._id}`}><button >Edit</button></Link>
            </div>
        ))}</div>
       
        
      </div>
    )
}

export default Notes