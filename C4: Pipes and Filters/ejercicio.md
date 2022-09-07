La consultora N7B nos solicita la creación de un API capaz de procesar distintas entradas de texto, procesar cada una y devolver los resultados de manera transparente.

El API debe contar con un método transform el cual recibirá por el queryParam words n palabras a transformar separadas por ‘,’. Por ejemplo:

/transform?words=arquitectura,de,software

Para el método transform se requiere procesar texto de entrada con diversas palabras en donde debe realizar las siguientes transformaciones:

Pasarlas a Uppercase: es decir, capitalizar cada palabra (ejemplo: software → SOFTWARE)
Aplicarles una función reverse: es decir, Invertir cada palabra (ejemplo:software → erawtfos)

Ejemplo de entrada y salida con palabras  “arpa”y “arbol”:
arpa =>  ARPA  => APRA,
arbol => ARBOL => LOBRA


Además, las “transformaciones” deben poder ser configurables, modificables para poder eventualmente cambiar su orden en tiempo de desarrollo de una forma accesible. 

Inclusive se podría utilizar una transformación o no.


Proponga un diseño, o esquema en donde se pueda dar solución a lo propuesto. Identifique posibles pipes & filters que debería tener la solución
