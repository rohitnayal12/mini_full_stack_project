const express = require("express");
const { NoteModel } = require("../model/noteModel");
const { auth } = require("../middlewares/auth.middleware");

const noteRouter = express.Router();

//add notes
noteRouter.post("/create",auth,async(req,res)=>{

    try {
        note=await NoteModel(req.body)
        await note.save()
        return res.status(200).send({"msg":"A new note has been created."}) 
    } catch (error) {
        res.send({"err":error})
    }
    
})


//get notes
noteRouter.get("/",auth,async(req,res)=>{

    try {
        const notes=  await NoteModel.find({userId:req.body.userId})
        return res.status(200).send(notes) 
    } catch (error) {
        res.send({"err":err})
    }
    
})


//update note with the help of noteID
noteRouter.patch("/update/:noteID",auth,async(req,res)=>{
const {noteID}=req.params
  note =  await NoteModel.findOne({_id:noteID})
  console.log(note)

console.log(req.body.userId)
console.log(note.userId)
    try {
        if(req.body.userId!==note.userId){
           return res.send({"msg":"You are not authorized!!!!!!!"})
        }
        else{
            note =await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            return res.status(200).send(`Note with noteID ${noteID} has been updated.`) 
        }
        
    } catch (error) {
        res.send({"err":error})
    }
    
})


//delete note
noteRouter.delete("/delete/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params
    note =await NoteModel.findOne({_id:noteID})
        try {
            if(req.body.userId!==note.userId){
                return res.send({"msg":"You are not authorized!!!!!!!"})
             }
             else{
                note =await NoteModel.findByIdAndDelete({_id:noteID})
        
                return res.status(200).send(`Note with noteID ${noteID} has been deleted.`)  
            }
           
        } catch (error) {
            res.send({"err":err})
        }
        
    })















module.exports = {
    noteRouter,
  };