function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function asyncFunction(input) {
  await timeout(1000);
  if (input <= 10) {
    return `Input is ${input}`;
  } else {
    throw new Error("Input should be less than or equals to 10");
  }
}
// Con errores
(async () => {
  try {
    let result = await asyncFunction(20);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
})();

// Sin errores
// (async () => {
//   try {
//     let result = await asyncFunction(5);
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// })();
