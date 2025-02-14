const express = require("express");
const cors = require("cors");

const app = express(); 
app.use(express.json()); // needed in order to have access to req.body
/* 
"cors" does not allow you to fetch from different domains by default! 
need to npm i cors on the backend! 
*/ 
app.use(cors());

app.use("/pokemons", require("./pokemons"));
app.use("/trainers", require("./trainers"));

app.listen(3000); 