const express = require("express");
const cors = require("cors");
const app = express(); 
app.use(express.json());
app.use(cors());

// importing manually created .js files using Router:
const games = require("./games");
const teams = require("./teams");
const champions = require("./champions");

// "/games" is already the prefix to every route inside of games.js
app.use("/games", games);

app.use("/teams", teams);

app.use("/champions", champions);

app.listen(3000); 