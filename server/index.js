const express= require("express");
const app= express();
const http= require("http");
const server = http.createServer(app);
const Socket=require("socket.io");

const userroutes= require("./routes/userroutes");
const courseroutes=require("./routes/courseroutes");
const contactRoute = require("./routes/contactRoute");
const paymentroutes= require("./routes/paymentroutes");
const profileroutes= require("./routes/profileroutes");
 
const database= require("./config/database");
const cloudinaryconnect=require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const cors=require("cors");
const fileupload= require("express-fileupload");
const dotenv=require("dotenv").config();

const port=4000;
//middlewares


app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        
    })
    //search what is credentials
)
app.use(
    fileupload({
        useTempFiles:true,
        tempFileDir:"/temp"
    })
);

const io = Socket(server,  {
    cors:{
    origin:"http://localhost:3000",
    methods: ["GET", "POST"]
    
}}); 

io.on("connection",(socket)=>{
    console.log("a new user connected");

    socket.on("message",(msg)=>{
        io.emit("message",msg);
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected");
    })

})

database();
cloudinaryconnect();
app.use("/api/v1/auth",userroutes);
app.use("/api/v1/course",courseroutes);
app.use("/api/v1/profile",profileroutes);
app.use("/api/v1/payment",paymentroutes);
app.use("/api/v1/contact", contactRoute);

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"your server is up and running ....."
    })
})

server.listen(port,()=>{
console.log(`app is running at server port ${port}`);
})
