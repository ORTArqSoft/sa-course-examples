class RectanculoSimple {
  constructor(alto, ancho) {
    this.alto = alto;
    this.ancho = ancho;
  }
}

var rect = new RectanculoSimple(10, 20);

class Rectangulo {
  constructor(alto, ancho) {
    this.alto = alto;
    this.ancho = ancho;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Método
  calcArea() {
    return this.alto * this.ancho;
  }
}

const cuadrado = new Rectangulo(10, 10);

console.log(cuadrado.area); // 100

class Punto {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distancia(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy);
  }
}

const p1 = new Punto(5, 5);
const p2 = new Punto(10, 10);

console.log(Punto.distancia(p1, p2)); // 7.0710678118654755
