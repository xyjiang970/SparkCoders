const express = require("express");
const cors = require("cors");
const app = express(); 
app.use(express.json());
app.use(cors());

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient(); // interact with prisma db

app.get("/pokemon", async (req, res) => {
    const pokemon = await prisma.pokemon.findMany();
    res.send(pokemon);
}); 

// "next" goes directly to the next route that matches your URL
// so if this id route errors out, go to /pokemon/:gender
app.get("/pokemon/id/:id", async (req, res, next) => {
    try {
        const pokemon = await prisma.pokemon.findUnique({
            where: {
                // whenever you do req.params.anything it will always be a string! 
                id: Number(req.params.id)
            }
        });
        res.send(pokemon);
    } catch (error) {
        next();
    }
}); 

// New: UPDATE
/* 
app.put 
- this will update an ENTIRE pokemon
*/

/* 
app.patch 
- this will update a portion of the pokemon
*/
app.patch("/pokemon/:id", async (req, res, next) => {
    try {
        const pokemon = await prisma.Pokemon.update({
            // which pokemon to update
            where: {
                id: Number(req.params.id)
            },

            // what do you want to update about this pokemon
            data: {
                evolution: req.body.evolution
            }
        });
        res.send(pokemon);
    } catch (error) {
        next(error);
    }
}); 

// New: DELETE
app.delete("/pokemon/:id", async (req, res, next) => {
    try {
        const id = req.params.id;

        const deletedPokemon = await prisma.Pokemon.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        //console.log(deletedPokemon);
        const pokemon = await prisma.pokemon.findMany();
        res.send(pokemon);
    } catch (error) {
        next(error);
    }
}); 

// gets all pokemon with that gender
app.get("/pokemon/:gender", async (req, res, next) => {
    try {
        // try to run this code, but if it errors out
        // go to the "catch" block, but does not CRASH the app!
        const pokemon = await prisma.pokemon.findMany({
            where: {
                gender: req.params.gender.toUpperCase() // ensure uppercase
            }
        });
        res.send(pokemon);
    } catch (error) {
        // forwards error message to client without crashing app
        next(error);
        //console.log(error);
    }
}); 

app.post("/pokemon", async (req, res) => {
    try {
        // res.send(req.body);
        // console.log(req.body);

        // creates table in database
        const pokemon = await prisma.Pokemon.create({
            data: {
                name: req.body.name,
                weight: req.body.weight,
                height: req.body.height,
                gender: req.body.gender,
                evolution: Number(req.body.evolution)
            }
        });
        /*
        Conventions
        1. If you have a route that creates something, send a "201" status code.
        2. If you have a route that creates something, always send back whatever you created.
        */
        res.status(201).send(pokemon);
    } catch (error) {
        res.status(500).send({
            message: "There was an error.",
            error: error
        });
    }
});

app.listen(3000); 