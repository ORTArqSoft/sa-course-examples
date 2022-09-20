1. Instale redis en su entorno de trabajo siguiendo la Guía proporcionada por el equipo docente.
2. Cree una conexión a redis siguiendo el ejemplo y/o la documentacion.
3. Guarde el siguiente objeto en cache: 
```
{
    curso: {
        nombre: "arquitectura de software",
        dictado: "2022",
        universidad: "ORT"
    }
}
```

4. Cree un endpoint llamado /curso que devuelva la informacion guardada en cache