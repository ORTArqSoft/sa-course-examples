const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const secret = "secret";

const users = [
  {
    username: "admin",
    password: "admin123",
    role: "admin",
  },
  {
    username: "student",
    password: "student123",
    role: "student",
  },
];

const books = [
  {
    author: "Chinua Achebe",
    country: "Nigeria",
    language: "English",
    pages: 209,
    title: "Things Fall Apart",
    year: 1958,
  },
  {
    author: "Hans Christian Andersen",
    country: "Denmark",
    language: "Danish",
    pages: 784,
    title: "Fairy tales",
    year: 1836,
  },
  {
    author: "Dante Alighieri",
    country: "Italy",
    language: "Italian",
    pages: 928,
    title: "The Divine Comedy",
    year: 1315,
  },
];

app.use(bodyParser.json());
app.post("/login", function (req, res) {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // devolver JWT
    const token = jwt.sign(user, secret);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

app.get("/books", function (req, res) {
  const { authorization } = req.headers;
  const authHeader = authorization.split(" ")[1];

  jwt.verify(authHeader, secret, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      res.json({ books });
    }
  });
});

app.post("/books", function (req, res) {
  const { authorization } = req.headers;
  const authHeader = authorization.split(" ")[1];

  const book = req.body;

  jwt.verify(authHeader, secret, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      const decoded = jwt.decode(authHeader);
      if (decoded.role === "admin") {
        books.push(book);
        res.send("Libro agregado con exito");
      } else {
        res.sendStatus(403);
      }
    }
  });
});

app.listen(3000);
