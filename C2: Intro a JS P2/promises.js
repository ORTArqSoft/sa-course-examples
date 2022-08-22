const promise = new Promise((resolve, reject) => {
  const numeroRandom = Math.round(Math.random() * 16);
  setTimeout(
    () =>
      numeroRandom > 4 ? resolve(numeroRandom) : reject(new Error("Menor a 4")),
    2000
  );
});

promise
  .then((number) => console.log(number))
  .catch((error) => console.log(error));

// Pasemosle parametros a una promsea
const addNumbers = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 3000);
  });
};

addNumbers(1, 2).then((result) => console.log(result));


