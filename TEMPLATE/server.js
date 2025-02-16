const express = require("express");
const cors = require("cors");
const app = express(); 
app.use(express.json());
app.use(cors());

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient(); // interact with prisma db

app.get("/", (req, res) => {
    res.send("new");
}); 

app.listen(3000); 