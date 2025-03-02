const express = require("express");
const cors = require("cors");
const app = express(); 
const axios = require("axios");
app.use(express.json());
app.use(cors());
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const socketio = require("socket.io");

const { PrismaClient } = require("@prisma/client");
//const prisma = new PrismaClient(); // interact with prisma db

app.get("/", async (req, res, next) => {
    try {
        res.send("hello world")
    } catch (error) {
        next(error);
    }
}); 

app.listen(3000); 

// if using socketio, uncomment below:
// const server = app.listen(3000);

// const io = socketio(server,
//     {
//         cors: {
//             origin: "http://localhost:5173" // NO TRAILING SLASH AT END OF URL!
//         }
//     }
// );

// io.on("connection", (socket) => {
//     console.log(`${socket.id} has connected`)
// });