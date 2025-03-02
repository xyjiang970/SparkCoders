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

// app.listen(...) returns the server that it created
const server = app.listen(3000); 

// socketio requires a server
// it turns your server into a "socket server"
// socketio is the library - need to pass in server:
const io = socketio(server,
    {
        cors: {
            origin: "http://localhost:5173"
        }
    }
);

// stored in array for simplicity 
const messages = [];

io.on("connection", (socket) => {
    socket.emit("allMessages", messages);

    socket.on("sendMessage", (data) => {
        messages.push(data);
        io.emit("allMessages", messages);
        //console.log(data);
    })
});