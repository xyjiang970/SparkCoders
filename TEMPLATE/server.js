const express = require("express");
const app = express(); 
app.use(express.json());

app.get("/", (req, res) => {
    res.send("new");
}); 

app.listen(3000); 