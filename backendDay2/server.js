const express = require("express");
const app = express(); // invoke it

app.get("/", (req, res) => {
    res.send("helasdflo");
}); 

app.listen(3000); // typically 3000