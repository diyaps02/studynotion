const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const Socket = require("socket.io");

const userroutes = require("./routes/userroutes");
const courseroutes = require("./routes/courseroutes");
const paymentroutes = require("./routes/paymentroutes");
const profileroutes = require("./routes/profileroutes");

const database = require("./config/database");
const cloudinaryconnect = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        // Add other CORS options if necessary
    })
);
app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "/temp" // Ensure this directory exists
    })
);

// Socket.io setup
const io = Socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Socket.io event handlers
io.on("connection", (socket) => {
    console.log("A new user connected");

    socket.on("message", (msg) => {
        io.emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Connect to database and cloudinary
database();
cloudinaryconnect();

// Routes
app.use("/api/v1/auth", userroutes);
app.use("/api/v1/course", courseroutes);
app.use("/api/v1/profile", profileroutes);
app.use("/api/v1/payment", paymentroutes);

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Your server is up and running..."
    });
});

// Start server
server.listen(port, () => {
    console.log(`App is running at server port ${port}`);
});
