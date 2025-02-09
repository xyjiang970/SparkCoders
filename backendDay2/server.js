const express = require("express");
const app = express(); // invoke it

app.get("/", (req, res) => {
    res.send("hello");
}); 

app.listen(3000); // typically 3000