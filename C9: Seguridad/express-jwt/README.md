# Arquitectura de Software

## Autenticación y autorización con JWT

### Objetivos

- Implementar una API REST con operaciones CRUD para libros
- Implementar un mecanismo de autenticación y autorización utilizando [JWT](https://jwt.io/)

### Ejercicio

La idea es realizar un flujo de autenticación y autorización de usuarios.

1. Se hace una petición para autenticar el usuario por medio de credenciales
2. Se firma el token JWT por medio de una clave privada
3. Se devuelve el token JWT
4. La aplicación cliente guarda el token devuelto para utilizarlo en las llamadas que requieran autenticación
5. El cliente envía el token JWT como cabezal de la petición
6. El servicio destino verifica la validez del token por medio de una clave pública
7. Si el token es válido el sistema retorna la información solicitada

#### API de autenticacion

1. **POST** _/login/_

   ```json
   {
     "username": "admin",
     "password": "admin123"
   }
   ```

   respuesta:

````json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6Im9ydCIsImlhdCI6MTU1MTI5NDkwOX0.1AcM6WjVEcU9iE6OEsAPBOMUXGGF9Mt9o8iCxVzOdZ0"
}
````

luego, si quiero usar el token en el API de libros:

**GET** _/books/

Agregar el header `Authorization` con la informacion

`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6Im9ydCIsImlhdCI6MTU1MTI5NDkwOX0.1AcM6WjVEcU9iE6OEsAPBOMUXGGF9Mt9o8iCxVzOdZ0`


#### API de libros
1. **GET** \*/books

   ```json
   [
     {
       "author": "Chinua Achebe",
       "country": "Nigeria",
       "language": "English",
       "pages": 209,
       "title": "Things Fall Apart",
       "year": 1958
     },
     {
       "author": "Hans Christian Andersen",
       "country": "Denmark",
       "language": "Danish",
       "pages": 784,
       "title": "Fairy tales",
       "year": 1836
     },
     {
       "author": "Dante Alighieri",
       "country": "Italy",
       "language": "Italian",
       "pages": 928,
       "title": "The Divine Comedy",
       "year": 1315
     }
   ]
````

```

```

2. **POST** _/books/_
   ```json
   {
     "author": "New entry",
     "country": "England",
     "language": "EN-US",
     "pages": 1024,
     "title": "My first book",
     "year": 1992
   }
   ```

Todos los endpoints deben estar protegidos.

Al momento de implementar la protección de endpoints primero va a tener que generar un token de JWT que será devuelto al cliente y éste lo utilizara en las subsiguiente llamadas.

Puede optar por usar una base de datos o guardar en memoria un array con los nuevos registros.
