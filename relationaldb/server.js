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

// update A character
/*
Note:
PATCH (200) -> small update, updates a portion of character info.
PUT (201) -> updates the ENTIRE character (all info!)
*/
app.patch("/characters/:id", async (req, res, next) => {
    try {
        const updatedCharacter = await prisma.Character.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                avatar: req.body.avatar,
                level: req.body.level
            }
        });
        
        res.status(200).send(updatedCharacter);
    } catch (error) {
        next(error);
    }
});

// get A characters
app.get("/characters/:id", async (req, res, next) => {
    try {
        const character = await prisma.Character.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                equips: true
            }
        });

        res.send(character);
    } catch (error) {
        next(error);
    }
});

app.delete("/characters/:id", async (req, res, next) => {
    try {
        await prisma.Character.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        // 204 means "no content"
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

// create A character
// note that POST request makes a whole new row in db!
app.post("/characters", async (req, res, next) => {
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
// note that POST request makes a whole new row in db!
app.post("/equips", async (req, res, next) => {
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

// update A equip
/*
Note:
PATCH (200) -> small update, updates a portion of character info.
PUT (201) -> updates the ENTIRE character (all info!)
*/
app.patch("/equips/:id", async (req, res, next) => {
    try {
        const updatedEquip = await prisma.Equip.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                attack: req.body.attack,
                stars: req.body.stars,

                characterID: req.body.characterID
            }
        });
        
        res.status(200).send(updatedEquip);
    } catch (error) {
        next(error);
    }
});

app.delete("/equips/:id", async (req, res, next) => {
    try {
        await prisma.Equip.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        // 204 means "no content"
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

app.listen(3000); 