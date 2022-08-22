const promise = new Promise((resolve, reject) => {
  const numeroRandom = Math.round(Math.random() * 8);
  setTimeout(
    () =>
      numeroRandom > 4 ? resolve(numeroRandom) : reject(new Error("Menor a 4")),
    2000
  );
});

async function ejecutarPromesa() {
  try {
    const result = await promise;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

ejecutarPromesa();
