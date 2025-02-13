const express = require("express");
const app = express(); // invoke it

// tells express to expect json in req.body
app.use(express.json()); // always use this in express apps! 

// temp "database" for now
let pokemon = [];
let id = 1;

// RESTful API

// gets all the pokemon
app.get("/pokemon", (req, res) => {
    res.send(pokemon);
}); 

// creates a pokemon
app.post("/pokemon", (req, res) => {
    /* when sending a request to this route, it will add a new pokemon into the array and send the array. */
    // sending raw json 
    /* 
    If req.body is undefined, there are 3 possible reasons:
        1. you didn't send a body through postman
        2. you can only access req.body in POST, PUT, and PATCH routes
        3. you didn't add the express.json() middleware
    */ 
    // console.log(req.body.name); // req.body

    // const name = req.body.name
    const {name} = req.body; // same as line directly above (destructuring)

    //pokemon.push(name); // pushes name kirby to pokemon list

    pokemon.push({ 
        id: id, // id++ works here too
        name 
    }); // array of objs.
    id++; // iterates id

    res.send(pokemon); // send "pokemon" back to client

    // typically with deletes you do:
    // res.sendStatus(204); // 204 means "No Content"
}); 

// Not RESTful because it's only getting one specific pokemon rather than all pokemon. Name your routes what you think it does!
// app.get("/pokemon", (req, res) => {
//     res.send(charmander);
// }); 

/*
// would probably delete ALL pokemon
// need to supply it with a specific pokemon to delete!
app.delete("/pokemon", (req, res) => {
    
});

// delete a single pokemon that matches
app.delete("/pokemon/:id", (req, res) => {
    
});
*/

app.delete("/pokemon/:id", (req, res) => {
    //console.log(typeof req.params.id); // id from params will always be string here
    //console.log(typeof Number(req.params.id)); // need to convert it back to number

    // deletes the pokemon that has id. req.params.id (passed in id),
    // then send all pokemon back as a response.
    const id = Number(req.params.id);
    
    pokemon = pokemon.filter((singlePokemon) => {
        if (singlePokemon.id === id) {
            return false;
        } else {
            return true;
        }
    })

    // status code 201 means "Created"
    res.status(201).send(pokemon);
});

app.listen(3000); // typically 3000