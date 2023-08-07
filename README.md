### Acceso

| Método | Endpoint       | Descripción                               | Body (Cuerpo de la solicitud)                                                                                                                                            | Headers (Encabezados de la solicitud)                         |
|--------|----------------|-------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| POST   | /signup        | Crear usuario                             | { "nombre":"Rodrigo Rodriguez","email":"rrodriguez@ejemplo.com","password":"123456" }                                                                                    | Content-Type: application/json                                |
| POST   | /signin        | Autenticar usuario                        | { "email":"rrodriguez@ejemplo.com","password":"123456" }                                                                                                                 | Content-Type: application/json                                |

### Publicaciones

| Método | Endpoint       | Descripción                               | Body (Cuerpo de la solicitud)                                                                                                                                             | Headers (Encabezados de la solicitud)                         |
|--------|----------------|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| GET    | /posts         | Obtener lista de todas la publicaciones   | N/A                                                                                                                                                                       | N/A                                                           |
| POST   | /posts         | Crear una nueva publicacion               | { "titulo": "el_titulo","descripcion": "la_descripcion","precio": 999,"formato": "el_formato","marca": "la_marca","tipo": "normal","imagen": "https://picsum.photos/240"} | Content-Type: application/json, Authorization: Bearer {token} |
| PUT    | /posts/{id}    | Actualizar información de una publicacion | { "titulo": "tit","descripcion": "des","precio": 777,"formato": "for","marca": "mar","tipo": "normal","imagen":"https://picsum.photos/240"}                               | Content-Type: application/json, Authorization: Bearer {token} |
| DELETE | /posts/{id}    | Eliminar una publicacion por ID           | N/A                                                                                                                                                                       | Authorization: Bearer {token}                                 |

