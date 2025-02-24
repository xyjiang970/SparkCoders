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
// note the async here!
app.post("/register", async (req, res, next) => {
    // 1. Get the username and password from req.body:
    const {username, password} = req.body;

    // 2. Encrypt the password before inserting into DB (never store passwords in DB as plain text):
    // saltRounds -> "how secure" you want you encrypt
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        // 3. Actually create your user:
        const newUser = await prisma.user.create({
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
    res.send(user);

});

app.listen(3000); 