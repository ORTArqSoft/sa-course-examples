const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const users = [
  {
    username: "admin",
    password: "admin123",
    role: "admin",
  },
  {
    username: "alumno",
    password: "alumno123",
    role: "member",
  },
];

const accessTokenSecret = "youraccesstokensecret";

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Authentication service started on port 3000");
});

app.post("/login", (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;

  // Filter user from the users array by username and password
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret
    );

    res.json({
      accessToken,
    });
  } else {
    res.send("Username or password incorrect");
  }
});
