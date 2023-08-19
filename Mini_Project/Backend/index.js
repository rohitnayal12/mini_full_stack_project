const express=require('express')
const { connection } = require('./db')
const { userRouter } = require('./routes/userRoute')
const { noteRouter } = require('./routes/noteRoute')
const cors=require("cors")

const app=express()

app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",noteRouter)


app.get("/",async(req,res)=>{
    //console.log("Homepage")
    res.send("HomePage")
})

app.listen(8080,async()=>{
try {
    await connection
    console.log("Server is running....")
} catch (error) {
    console.log(error)
}
})