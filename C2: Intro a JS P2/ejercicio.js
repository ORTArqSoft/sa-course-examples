function calcularResultado(nombre, edad, callback) {
  const habilitado = edad >= 18;
  callback(habilitado, nombre);
}

function puedeManejar(estaHabilitado, nombre) {
  estaHabilitado
    ? console.log(nombre + " Puede manejar")
    : console.log(nombre + " No puede manejar");
}

calcularResultado("Pedro", 16, puedeManejar);

class Persona {
  constructor(edad, nombre, ci) {
    this.edad = edad;
    this.nombre = nombre;
    this.ci = ci;
  }
  firma() {
    return this.nombre + " " + this.ci;
  }
}

const facundo = new Persona(30, "Facundo", "1234567");
console.log(facundo.firma());
