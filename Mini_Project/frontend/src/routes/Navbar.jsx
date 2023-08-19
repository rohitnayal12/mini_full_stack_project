import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div style={{display:"flex",gap:"10px",justifyContent:"space-around"}}>
        <Link to="/" style={{textDecoration:"none"}}>HOME</Link>
        <Link to="/notes" style={{textDecoration:"none"}}>NOTES</Link>
        <Link to="/addnotes" style={{textDecoration:"none"}}>CREATENOTE</Link>
        <Link to="/signup" style={{textDecoration:"none"}}>SIGNUP</Link>
        <Link to="/login" style={{textDecoration:"none"}}>LOGIN</Link>
    </div>
  )
}

export default Navbar