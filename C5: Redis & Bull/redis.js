// $ npm install -g redis-commander
// $ redis-commander

const redis = require("redis");

async function redisExample() {
  // Creamos el cliente a redis
  const client = redis.createClient(); // (port,host) por defecto (127.0.0.1, 6379 )

  // client api∫
  client.on("connect", function () {
    console.log("Conexion a redis exitosa!");
  });
  client.on("error", (err) =>
    console.log("Hubo un error en el cliente de redis:", err)
  );

  await client.connect();

  await client.set("key", "value");

  const value = await client.get("key");

  console.log(value);
}

redisExample();
