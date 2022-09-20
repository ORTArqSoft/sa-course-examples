const redis = require("redis");

async function redisConnection() {
  // Creamos el cliente a redis
  const client = redis.createClient(); // (port,host) por defecto (127.0.0.1, 6379 )

  // client api
  client.on("connect", function () {
    console.log("Conexion a redis exitosa!");
  });
  client.on("error", (err) =>
    console.log("Hubo un error en el cliente de redis:", err)
  );

  await client.connect();

  return client;
}

module.exports = { redisConnection };
