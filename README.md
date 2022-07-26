# Node API
## Repo con la solucion del BE chalenge

Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,
AngularJS-powered HTML5 Markdown editor.

## Features

- API usando NodeJS y Express
- Incluye encriptacion de contraseña usando bcrypt
- Base de datos NO-SQL MongoDB
- Aplicacion Dockerizada (Node APP y MongoDB)
- Solo me faltaron las pruebas 😢

## Requisitos
- Node version 12 o superior
- Robo3t para visualizar las colecciones de MongoDB
- Docker y Docker Compose para ejecutar la aplicacion.

```sh
docker-compose up -d
```

Si desea ejecutar el proyecto por separado, debe asegurarse de ejecutar MongoDB:
```sh
npm start
```

## Endpoints

Los siguientes son los endpoints disponibles dentro de la API, todas bajo el dominio localhost:3000/api

| Path | Metodo | Descripcion | Requiere Token?
| ------ | ------ | ------ | ------ |
| /createUser | POST | Creaer un usuario en base de datos | No |
| /getAllUsers | GET | Obtener todos los usuarios registrados en base de datos | Si |
| /getOneUserById/:id | GET | Retornar un usuario por id (MondoDB ID) | Si | 
| /login | POST | Login de usuario, requiere email y contrasena | No |
| /logout | GET | Cerrar sesion y destruir el token. | Si |
| /getPlaces | GET | Dadas las coordenadas y una ubicacion, retorna los lugares asociados. (Powered by [HereAPI](https://developer.here.com/)) | Si |
| /getAllTransactions | GET | Obtener la lista de todas las transacciones realizadas en la API | Si |




 
