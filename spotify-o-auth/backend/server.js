const express = require("express");
const cors = require("cors");
const app = express(); 
const axios = require("axios");
app.use(express.json());
app.use(cors());
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
//const prisma = new PrismaClient(); // interact with prisma db

app.get("/", async (req, res, next) => {
    try {
        res.send("hello world")
    } catch (error) {
        next(error);
    }
}); 

app.get("/spotify-login", (req, res) => {
    //res.send(process.env);
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=user-modify-playback-state,user-read-playback-state`)
});

app.get("/spotify-callback", async (req, res, next) => {
    //console.log(req.query);
    //const code = req.query.code;
    const { code } = req.query; // capture the response code into a variable

    // according to docs (https://developer.spotify.com/documentation/web-api/tutorials/code-flow):
    try{
        const { data } = await axios.post(
            "https://accounts.spotify.com/api/token",
            
            {
                code, // same as code: code
                redirect_uri: process.env.REDIRECT_URI, 
                grant_type: 'authorization_code'
            },

            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
                }
            }
        ); 
        res.redirect(`http://localhost:5173/?access_token=${data.access_token}`);
    } catch (error) {
        next(error);
    }
});

app.listen(3000); 