const express = require("express")

require("dotenv").config();
require("./call")

const app = express()

app.use("/",(req,res)=>{
    return res.json({"message":"Hello"})
})

app.use((req,res,next)=>{
    next(createError(404,"Not Found"))
})


PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log(`Server is running on http://127.0.0.1:${PORT}`)
})