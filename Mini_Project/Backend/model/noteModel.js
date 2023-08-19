const mongoose=require('mongoose')
const noteSchema=mongoose.Schema({
    title: {type:String, required:true},
    body:{type:String, required:true},
    userId: {type:String, required:true},
    user:{type:String}
},{
    versionKey:false
})

const NoteModel=mongoose.model("mynotes",noteSchema)

module.exports={
    NoteModel
}

