const express = require("express");
const cors = require("cors");
const app = express(); 
const axios = require("axios");
const qs = require("qs");
app.use(express.json());
app.use(cors());
require("dotenv").config();

const {PrismaClient} = require("@prisma/client");
//const prisma = new PrismaClient(); // interact with prisma db

app.get("/githublogin", async (req, res, next) => {
    try {
        //res.redirect("https://www.google.com") // need the "https://www." here!
        //res.send(process.env);
        //res.send(process.env.CLIENT_ID);
        //res.send(process.env.CLIENT_SECRET);
        res.redirect(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.CLIENT_ID}`);
    } catch (error) {
        next(error);
    }
}); 

/*
Authorization callback URL (mandatory field on github when 
registering a new OAuth app).
Step that brings you from github back to own url.

Query parameter:
http://localhost:3000/githubcallback?code=de837530a450db71d6c8
*/
app.get("/githubcallback", async (req, res, next) => {
    try {
        //res.send(req.query.code);
        const code = req.query.code;

        const {data} = await axios.post(
            // first axios argument: URL
            "https://github.com/login/oauth/access_token",

            // second axios argument: body
            {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code // we already initialized this to req.query.code
            },

        );
        
        // qs = querystring
        const access_token = qs.parse(data).access_token;
        //console.log(access_token);

        const response = await axios.get(
            "https://api.github.com/user", 

            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        );

        //res.send(response.data);
        res.redirect(`http://localhost:5173/profile/?token=${access_token}`);
        
    } catch (error) {
        next(error);
    }
}); 

app.listen(3000); 