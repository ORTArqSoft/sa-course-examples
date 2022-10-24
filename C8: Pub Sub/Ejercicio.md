# Arquitectura de Software
## CQRS EJERCICIO
Se desea modelar un banco de manera simplificada. Supondremos que se manejan las siguientes entidades:

*Usuarios*: de los que sabemos el nombre completo, el email, documento y fecha de ingreso al sistema

*Cuentas*: cada cuenta pertenece a un usuario, y un usuario puede tener más de una cuenta, de las cuentas interesa conocer su tipo de moneda (Dolares, Pesos, Euros etc), y su fecha de creación.

*Transacciones*: las transacciones se realizan sobre una única cuenta, y una cuenta puede tener muchas transacciones, de estas interesa saber el monto, el concepto (depósito o retiro) y la fecha de la transacción. Por el momento no se validará que una cuenta tenga saldo suficiente para poder retirar dinero pero interesa poder validar en el futuro.

El banco desea poder crear nuevos usuarios, cuentas y transacciones de manera segura y manteniendo la integridad de los datos. 
Además se desea poder generar reportes sobre el **balance** de las cuentas de todos los usuarios, siendo el balance el monto total de una cuenta en un momento dado. El reporte debe incluir para cada cuenta su balance, el tipo, los datos del usuario al que pertenece y las últimas 5 transacciones realizadas sobre la misma (ordenadas de forma descendente por fecha) . 

El banco tiene múltiples sucursales en todo el país, todos los días se crean nuevas cuentas y se manejan millones de transacciones por día. Es muy importante que la generación de reportes no degrade la capacidad transaccional del banco, por lo que al banco le parece aceptable que los reportes puedan demorar unos segundos en actualizarse cuando se genera una transacción. 

### SE REQUIERE
- Implementar una rest-api utilizando express/koa que exponga los servicios para crear usuarios, cuentas, transacciones y obtener reportes de balance (se podrán obtener reportes de cuentas por usuario, y tambíen un reporte general con los datos de todas las cuentas).
- Para simular actividad sobre las cuentas, realizar un script que genere usuarios, cuentas y muchas transacciones sobre las mismas.

### PROPUESTA
Resolver el problema utilizando el patrón arquitectónico CQRS. Puede utilizar este esqueleto de rest-api para comenzar el desarrollo.
 
### PARA PENSAR
- ¿En qué me beneficia separar los modelos de lectura y escritura?
- ¿Cómo puedo sincronizar los datos?, de lo visto en clase, ¿qué puede utilizar para lograr esto?
- ¿Qué sucede con la consistencia entre lectura y escritura de datos?, ¿cómo puede mitigar este problema?




