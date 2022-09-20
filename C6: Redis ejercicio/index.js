const express = require("express");
const { redisConnection } = require("./redis");
const { getDataFromJson } = require("./json");
const app = express();

app.get("/redis", async function (req, res) {
  const redisClient = await redisConnection();
  console.log("Leyendo dato de redis");
  // Happy path
  const resultado = await redisClient.get("data");
  if (resultado) {
    console.log('Devolviendo el resultado')
    res.send(resultado);
  }

  if (!resultado) {
    console.log("No encuentro el dato en redis...");
    const dataFromJson = getDataFromJson();
    console.log(dataFromJson.data)
    console.log("Guardando dato en redis");
    await redisClient.set("data", dataFromJson.data);
    res.send(dataFromJson.data);
  }
});

app.listen(3000);
