function errorHandling() {
  try {
    
  } catch (error) {
    const variable = "hello";
    console.log(variable);
  
    // lanzar una excepción en javascript es mediante la palabra reservada throw
    // throw interrumpe la ejecución del programa y se puede capturar con un try/catch
    throw new Error("This is an error");
  
    console.log(variable.toUpperCase());
    
  }
}

errorHandling();
