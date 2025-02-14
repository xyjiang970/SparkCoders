const express = require("express");
const cors = require("cors");

const router = express.Router(); 
router.use(express.json()); 
router.use(cors());

// temp. database
const trainers = [];

// gets all the trainers  we have
router.get("/", (req, res) => {
    res.send(trainers);
}); 

// creates a new trainer
router.post("/", (req, res) => {
    trainers.push(req.body.name); // push into array

    res.send(trainers); // send list of all pokemon created
}); 

router.delete("/", (req, res) => {

});

// PATCH updates trainer with that ID
router.patch("/", (req, res) => {

});


// this is how you export in node.js
module.exports = router;