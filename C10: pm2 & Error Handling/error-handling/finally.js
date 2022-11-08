try {
  // no hay errores
  console.log("Comienza mi ejecución"); // (1) <--
  lalala; // meto la pata
  setTimeout(() => {
    console.log("Termina mi ejecución"); // (2) <-- esto no se va a ejecutar
  }, 1000);
} catch (err) {
  console.log("Hubo un error!"); // (3)
} finally {
  console.log("Ejecuto si o si esto"); // (4) <--
}
