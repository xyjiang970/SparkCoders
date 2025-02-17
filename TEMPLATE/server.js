const express = require("express");
const cors = require("cors");
const app = express(); 
app.use(express.json());
app.use(cors());

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient(); // interact with prisma db

app.get("/", async (req, res, next) => {
    try {
        res.send("hello world")
    } catch (error) {
        next(error);
    }
}); 

app.listen(3000); 