import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Signup from '../pages/signup'
import Login from '../pages/login'
import Notes from '../pages/notes'
import AddNotes from '../pages/addNotes'
import EditNotes from '../pages/editNotes'





function Allroutes() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/notes" element={<Notes/>}/>
        <Route path="/addnotes" element={<AddNotes/>}/> 
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/editnotes/:id" element={<EditNotes/>}/>
        
        </Routes>
    </div>
  )
}

export default Allroutes