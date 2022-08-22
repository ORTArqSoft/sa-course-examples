// Declaración de variables
{
  var nombre = "Juan";
  let apellido = "Perez";
  const edad = 30;

  console.log("Hola", nombre + " " + apellido + " " + edad);

  // Reasignar variables:

  nombre = "Pedro";
  apellido = "Garcia";
  edad = 35;
  console.log("Hola", nombre + " " + apellido);
}

// function scope
function setWidth() {
  var width = 100;
  console.log(width);
}
// Que va a devolver esto?
// console.log(width);

// block scope
// var scope
var edad = 100;
if (edad > 12) {
  var edadPerruna = edad * 7;
  console.log(`Tienes ${edadPerruna} años perro!`);
}
// Que va a devolver esto?
console.log(edadPerruna);

// let y const scope
if (age > 12) {
  let edadGatuna = age * 4;
  console.log(`You are ${edadGatuna} años gato!`);
}
// Que va a devolver esto?
console.log(edadGatuna);
