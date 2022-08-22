function Saludar(nombre, edad) {
  console.log("Hola mi nombre es " + nombre + " y tengo " + edad + " años.");
}

Saludar("Facundo", 27);

// Funciones anonimas
const bienvenida = function () {
  console.log("Bienvenidos a Arquitectura de Software");
};

bienvenida();

// arrow functions

const saludar = (nombre, edad) => {
  console.log("Hola mi nombre es " + nombre + " y tengo " + edad + " años.");
};

saludar("Facundo", 27);

// named functions
const namedSum = function sum(a, b) {
  console.log(a + b);
};

namedSum(1 + 2);
