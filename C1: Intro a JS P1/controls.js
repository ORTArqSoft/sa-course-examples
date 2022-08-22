// Estructuras de control
// if, else if, else

var animal = "perro";
var sonido = "";
if (animal == "gato") {
  sonido = "miau";
} else if (animal == "perro") {
  sonido = "woof";
} else {
  sonido = "no sound";
}
sonido == "woof";

// while, do while

while (true) {
  // an infinite loop!
}

// for

for (var i = 0; i < 5; i++) {
  console.log(`iteration with "for" n˚: ${i}`);
}

// for..of

var numbers = [0, 1, 2, 3, 4];
for (let item of numbers) {
  console.log(`iteration whit "for..of" n˚: ${item}`);
}

// for..in

var person = { name: "John", lastName: "Doe" };
for (let attribute in person) {
  console.log(`iteration whit "for..in" n˚: ${person[attribute]}`);
}

// short circuit

var obj = { name: "John" };
var name = obj && obj.name;

// cached example

var cachedName = null;
var name = cachedName || (cachedName = obj.name);

// ternary operator

var age = 25;
var allowed = age > 18 ? "yes" : "no";
console.log(allowed);

// switch

const action = "update";
switch (action) {
  case "create":
    console.log("Create invoked");
    break;
  case "update":
    console.log("Update invoked");
    break;
  case "delete":
    console.log("Delete invoked");
    break;
  default:
    console.log("Default action invoked");
}
