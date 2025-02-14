const express = require("express");
const cors = require("cors");

const app = express(); 
app.use(express.json());

const {PrismaClient} = require("@prisma/client");

app.get("/", (req, res) => {
    res.send("new");
}); 

app.listen(3000); 