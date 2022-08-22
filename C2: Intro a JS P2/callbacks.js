// sincrono
function saludarAlumnos(saludo, callback) {
  var miCita = "Les recomendamos " + saludo;
  callback(miCita);
}

function logSaludo(cita) {
  console.log(cita);
}

saludarAlumnos("repasar javascript!", logSaludo);



//asíncrono
function foo(callBack) {
  console.log("Inicia foo...");
  callBack(5000);
  console.log("Continua foo...");
}

function timeFunction(time) {
  setTimeout(() => {
    console.log("Termina ");
  }, time);
}

foo(timeFunction);
