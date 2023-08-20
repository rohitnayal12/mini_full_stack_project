const express=require('express')
const { connection } = require('./db')
const { userRouter } = require('./routes/userRoute')
const { noteRouter } = require('./routes/noteRoute')
const cors=require("cors")

const swaggerJSdoc=require("swagger-jsdoc")
const swaggerUI=require("swagger-ui-express")

const app=express()

app.use(cors())
app.use(express.json())

//configuration for swaggerJSdoc
 
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Making Notes',
        version: '1.0.0',
      },
      servers:[
        {
          url:"http://localhost:8080"  
        }
    ]
    },
    
    apis: ['./routes/*.js'], // files containing annotations as above
  };

  //openAPI specs 

  const openapiSpec = swaggerJSdoc(options)

  //build the swaggerUI with the help of openAPIspec
app.use("/docs",swaggerUI.serve,swaggerUI.setup(openapiSpec))



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