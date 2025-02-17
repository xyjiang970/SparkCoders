const router = require("express").Router();

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient(); // interact with prisma db

/* 
prefix: /teams
*/
router.get("/", async (req, res, next) => {
    try {
        res.send(await prisma.Team.findMany({
            include: {
                //game: true,
                champions: true
            }
        }));
    } catch (error) {
        next(error);
    }
}); 

router.post("/", async (req, res, next) => {
    try {
        res.status(201).send(await prisma.Team.create({
            data: {
                name: req.body.name,
                gameID: req.body.gameID
            }
        }));
    } catch (error) {
        next(error);
    }
}); 


module.exports = router;