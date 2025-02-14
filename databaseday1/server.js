const express = require("express");
const cors = require("cors");
const app = express(); 
app.use(express.json());

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient(); // interact with prisma db


app.get("/pokemon", async (req, res) => {
    const pokemon = await prisma.pokemon.findMany();
    res.send(pokemon);
}); 

app.get("/pokemon/:gender", async (req, res) => {
    const pokemon = await prisma.pokemon.findMany({
        where: {
            gender: req.params.gender.toUpperCase() // ensure uppercase
        }
    });
    res.send(pokemon);
}); 

app.post("/pokemon", async (req, res) => {
    // res.send(req.body);
    // console.log(req.body);

    // creates table in database
    const pokemon = await prisma.Pokemon.create({
        data: {
            name: req.body.name,
            weight: req.body.weight,
            height: req.body.height,
            gender: req.body.gender,
            evolution: req.body.evolution
        }
    });
    /*
    Conventions
    1. If you have a route that creates something, send a "201" status code.
    2. If you have a route that creates something, always send back whatever you created.
    */
    res.status(201).send(pokemon);
});

app.listen(3000); 