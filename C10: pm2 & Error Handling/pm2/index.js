const express = require("express");

const app = express();

app.use(bodyParser.json());

app.listen(4000, () => {
  console.log("Books service started on port 4000");
});
