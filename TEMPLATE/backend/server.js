const express = require("express");
const axios = require("axios");
const qs = require("qs");

require("dotenv").config();

const app = express();

app.get("/githublogin", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.CLIENT_ID}`
  );
});

// a query parameter
// ?code=abc&query2=def&image_url=google.com
// http://localhost:3000/githubcallback?code=a53f63e3572a230a6676
app.get("/githubcallback", async (req, res) => {
  const code = req.query.code;

  const { data } = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    }
  );

  const access_token = qs.parse(data).access_token;

  res.redirect(`http://localhost:5173/profile?token=${access_token}`);
});

app.listen(3000);

/**
 *
 * environment variable
 *
 * a way to keep a "secret key"
 * a way to have different variables across different environments
 *
 * development environment might need client ID Ov23lipJRgMxRM97ZMVq
 *
 * production environment might need another client ID
 */
