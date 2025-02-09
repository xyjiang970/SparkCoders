// aka:
// index.js
// backend.js

// example of an import in the backend:
const express = require("express");
const app = express(); // invoke it

// GET request to "/"
// first arg is the route "/"
// second arg is a function
// app.get("/", (req, res) => {
//     res.send({
//         name: "hello",
//         level: 250,
//         isHungry: true,
//         abilities: [{
//             name: "eat"
//         }]
//     });
// });

// variable routes:
app.get("/:pokemonID", (req, res) => {
    console.log(req.params.pokemonID); // shows up in terminal
    res.send("456"); // send as response to client/ postman
}); 

// POST request to "/"
app.post("/", (req, res) => {
    res.send("This is the post route");
});

// backend servers tend to always be running (never shut down) and listening to requests!
app.listen(3000); // typically 3000