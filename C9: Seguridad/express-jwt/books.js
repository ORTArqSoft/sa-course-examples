const express = require("express");
const bodyParser = require("body-parser");
const { authenticateJWT } = require("./middleware");

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

const app = express();

app.use(bodyParser.json());

app.listen(4000, () => {
  console.log("Books service started on port 4000");
});

app.get("/books", authenticateJWT, (req, res) => {
  res.json(books);
});

app.post("/books", authenticateJWT, (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res.sendStatus(403);
  }

  const book = req.body;
  books.push(book);

  res.send("Book added successfully");
});
