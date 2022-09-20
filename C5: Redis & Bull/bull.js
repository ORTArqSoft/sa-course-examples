const Queue = require("bull");
const { reverse } = require("./miModulo");

// creando a queue
const queue = new Queue("myQueue");

// creando el job
const data = {
  text: "arquitectura",
};
const data2 = {
  text: "software",
};

const options = {
  attempts: 3, // Reintentar 3 veces si falla
};

// agregando el job a la queque
queue.add(data, options);
queue.add(data2, options);

// procesando el job
queue.process(async (job) => {
  const resultado = reverse(job.data.text);
  console.log(resultado);
});
