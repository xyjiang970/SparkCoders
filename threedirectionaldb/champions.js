const router = require("express").Router();

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient(); // interact with prisma db

/* 
prefix: /champions
*/
router.get("/", async (req, res, next) => {
    try {
        res.send(await prisma.Champion.findMany({
            orderBy: {
                name: "asc"
            },
            include: {
                game: true,
                team: true
            }
        }));
    } catch (error) {
        next(error);
    }
}); 

router.get("/:role", async (req, res, next) => {
    try {
        res.send(await prisma.Champion.findMany({
            where: {
                role: req.params.role.toUpperCase() // toUpperCase to match DB input
            }
        }));
    } catch (error) {
        next(error);
    }
}); 

router.post("/", async (req, res, next) => {
    try {
        res.status(201).send(await prisma.Champion.create({
            data: {
                name: req.body.name,
                role: req.body.role,
                gameID: req.body.gameID,
                teamID: req.body.teamID
            }
        }));
    } catch (error) {
        next(error);
    }
}); 


module.exports = router;