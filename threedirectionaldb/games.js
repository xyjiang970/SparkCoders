const router = require("express").Router();

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient(); // interact with prisma db

/* 
can just use .get("/") here since "/games" is 
already the prefix to every route inside of games.js

prefix: /games
*/
router.get("/", async (req, res, next) => {
    try {
        res.send(await prisma.Game.findMany({
            include: {
                teams: {
                    include: {
                        champions: {
                            select: {
                                name: true,
                                role: true
                            }
                        }
                    }
                }
            }
        }));
    } catch (error) {
        next(error);
    }
}); 

router.post("/", async (req, res, next) => {
    try {
        res.status(201).send(await prisma.Game.create({
            data: {
                name: req.body.name
            }
        }));
    } catch (error) {
        next(error);
    }
}); 


module.exports = router;