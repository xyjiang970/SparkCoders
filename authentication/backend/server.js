const express = require("express");
const cors = require("cors");
const app = express(); 
const axios = require("axios");
app.use(express.json());
app.use(cors());
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient(); // interact with prisma db

app.get("/", async (req, res, next) => {
    try {
        res.send("hello world")
    } catch (error) {
        next(error);
    }
}); 

/*
Recall:
- PUT: replaces entire resource with the provided data (useful when you want to completely update all details of a resource).

- PATCH: updates only specific parts of an existing resource (used when you only need to modify a few attributes of a resource).

- POST: creates a new resource on the server.
*/
app.post("/games", async (req, res, next) => {
    // bring in token
    const token = req.headers.authorization;

    // get ID of user, given that I have their token:
    // decode token
    const user = jwt.decode(token, "LUNA");

    //console.log(user.id);

    try {
        await prisma.game.create({
            data: {
                name: req.body.gameName,
                userID: user.id
            }
        });
        // 1. Send the single game that was just created [CONVENTIONAL]

        // 2. Get all the games this user owns, and sends that [will use this for now]
        res.send(
            await prisma.Game.findMany({
                where: {
                    userID: user.id
                }
            })
        );

    } catch (error) {
        next(error);
    };
});

// get all the games that our user owns
app.get("/games", async (req, res, next) => {
    // bring in token
    const token = req.headers.authorization;

    // get ID of user, given that I have their token:
    // decode token
    const user = jwt.decode(token, "LUNA");

    try {
        const games = await prisma.Game.findMany({
            where: {
                userID: user.id
            }
        });
        res.send(games);
    } catch (error) {
        next(error);
    }
});

app.post("/register", async (req, res, next) => {
    // 1. Get the username and password from req.body:
    const {username, password} = req.body;

    // 2. Encrypt the password before inserting into DB (never store passwords in DB as plain text):
    // saltRounds -> "how secure" you want you encrypt
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        // 3. Actually create your user:
        const newUser = await prisma.User.create({
            data: {
                username: username,
                password: hashedPassword
            }
        });

        // Token -> token that represents a user
        // Goal is turn newUser into a token and send token to frontend (encrypting)
        // 1st arg: thing you want to turn into token
        // 2nd arg: secret key that you can make whatever you want
        const token = jwt.sign(newUser, "LUNA");

        res.send(token);
    } catch (error) {
        next(error)
    };
});

app.post("/login", async (req, res, next) => {
    const {password, username} = req.body;

    /*
    Will have to use findFirst here if we did not 
    specify unique username in prisma.schema file
    in the User table.
    */
    const user = await prisma.User.findUnique({
        where: {
            username
        }
    });

    if (!user) {
        res.status(401).send({
            message: "No User Found. Create Account Instead!"
        })
        //res.sendStatus(401);
    } else {
        // check if password is correct:
        // two args:
        // 1. unhashed password (user typed)
        // 2. hashed password (password stored in db)
        // tells you whether they typed in the correct password
        const isCorrectPassword = bcrypt.compareSync(password, user.password);
        
        // if correct, then send user the token
        if (isCorrectPassword) {
            const token = jwt.sign(user, "LUNA");
            res.send(token);
        } else {
            // if not correct, then send error saying wrong password
            // 401 means unauthorized
            res.status(401).send({message: "Incorrect password!"}); 
        }

    };

});

// if you make get request to /account with token,
// that means you can get user data
app.get("/account", async (req, res, next) => {
    // 1. Take in the token
    const token = req.headers.authorization;
    //console.log(token);

    // 2. Decode token to figure out who is the logged in user
    // decrypting to get user
    const user = jwt.decode(token, "LUNA");

    // 3. Send user data
    if (user) {
        res.send(user);
    } else {
        res.sendStatus(401);
    };
    
});

app.listen(3000); 