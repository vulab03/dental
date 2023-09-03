const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const createError = require("http-errors")

require("dotenv").config();

const db = require('./configs/mongo.config');
const corsConfig = require("./configs/cor.config");
const corsMiddleware= require("./middlewares/cors.m") 
const logEvent = require("./helpers/log")
const Post = require("./models/post")

db.connect()

const app = express()

app.use(cors(corsConfig)) 
app.use(corsMiddleware)
app.use(helmet())
app.use(morgan('common'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());


require("./routes/index")(app);

// app.use('/',(req,res)=>{
//     res.json("hello world")
// })

app.use((req,res,next)=>{
    next(createError(404,"Not Found"))
})

app.use((err,req,res,next)=>{
    logEvent(`route: ${req.url}----method: ${req.method}----${err.message}`)
    res.status(err.status||500).json({
        status:err.status || 500,
        message:err.message,
    })
})

PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log(`Server is running on http://127.0.0.1:${PORT}`)
})