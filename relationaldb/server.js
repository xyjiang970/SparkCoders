const express = require("express");
const cors = require("cors");
const app = express(); 
app.use(express.json());
app.use(cors());

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient(); // interact with prisma db

// get ALL characters
app.get("/characters", async (req, res, next) => {
    try {
        // prisma.[TABLE NAME].findMany()
        const characters = await prisma.Character.findMany({
            include: {
                equips: true
            }
        });

        res.send(characters);
    } catch (error) {
        next(error);
    }
});

// create A character
app.post("/character", async (req, res, next) => {
    try {
        // prisma.[TABLE NAME].create({data{}})
        const character = await prisma.Character.create({
            data: {
                name: req.body.name,
                avatar: req.body.avatar,
                level: req.body.level
            }
        });
        
        res.status(201).send(character);
    } catch (error) {
        next(error);
    }
});

// get ALL equips
app.get("/equips", async (req, res, next) => {
    try {
        // prisma.[TABLE NAME].findMany()
        const equips = await prisma.Equip.findMany({
            // shows actual character info that owns the equip
            include: {
                character: true
            }
        });

        res.send(equips);
    } catch (error) {
        next(error);
    }
});

// create A equip
app.post("/equip", async (req, res, next) => {
    try {
        // prisma.[TABLE NAME].create({data{}})
        const equip = await prisma.Equip.create({
            data: {
                name: req.body.name,
                attack: req.body.attack,
                stars: req.body.stars,

                characterID: req.body.characterID
            }
        });
        
        res.status(201).send(equip);
    } catch (error) {
        next(error);
    }
});

app.listen(3000); 