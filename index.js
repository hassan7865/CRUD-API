const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const authRoute = require("./Routes/auth")
const userRoute = require("./Routes/user")
const cookieParser = require("cookie-parser")
dotenv.config()
app.use(express.json())
const connect = ()=>{
    mongoose.connect(process.env.MONGOURL).then(()=>{
        console.log("DB Connection Successfull!!")
    }).catch((err)=>{
        throw err
    })
}
app.use(cors({
    origin:"http://localhost:3000",
    methods:["POST,GET,PUT,DELETE"],
    credentials:true,
}))

app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.listen(process.env.PORT,()=>{
    connect()
    console.log("Server Started!!")
})