try {
  console.log("Comienza mi ejecución"); // (1) <--
  // ...no errors here
  variableNoDeclarada;
  setTimeout(() => {
    console.log("Termina mi ejecución"); // (2) <--
  }, 1000);
} catch (err) {
  console.error("Hubo un error: ", err.message); // (3)
}
