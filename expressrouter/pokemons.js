const express = require("express");
const cors = require("cors");

const router = express.Router(); 
router.use(express.json()); 
router.use(cors());

// temp. database
const pokemons = [];

// gets all the pokemon that we have
router.get("/", (req, res) => {
    res.send(pokemons);
}); 

// creates a new pokemon
router.post("/", (req, res) => {
    pokemons.push(req.body.name); // push into array

    res.send(pokemons); // send list of all pokemon created
}); 

router.delete("/", (req, res) => {

});

// PATCH updates pokemon with that ID
router.patch("/", (req, res) => {

});


// this is how you export in node.js
module.exports = router;