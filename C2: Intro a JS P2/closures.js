let count = 1;
function contador() {
  console.log(count);
}
contador(); // imprime 1

function miFuncion() {
  let count = 1;
  function contador() {
    console.log((count = count + 1));
  }
  contador(); // imprime 1
}

miFuncion();

const foo = (function () {
  let counter = 10;
  return function () {
    counter += 1;
    return counter;
  };
})();
console.log(foo());
console.log(foo());
console.log(foo());
