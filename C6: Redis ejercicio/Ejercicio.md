Ejercicio: Creacion de caché para lectura de datos

Objetivo: Implementar una cache utilizando redis para la lectura de datos.

Se require crear un endpoint /redis que ante una petición de tipo GET devuelva la información que está en el siguiente JSON:
`{ "data": "arquitectura de software" }`

- Devolver la información desde redis
- Si el dato no está en redis, buscarlo en la base de datos (data.json) y guardarlo en redis para la proxima petición.

