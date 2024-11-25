- Es un paquete que va a guardar todas las clases o definiciones con respecto a ruta de login y registro 
## AuthController
- Dentro se creo una clase **AuthController** que tiene en su interior dos métodos declarados 
	- **register** Permite al usuario registrarse en la aplicación
		- **EndPoint:**
			- **http://localhost:8080/auth/register**
	- **login** Permite al usuario acceder a la aplicación
		- **EndPoint:**
			- **http://localhost:8080/auth/login**
	- ![[Todo los archivos contenidos dentro del paquete Auth-1732541201880.jpeg]]
## AuthService
 - Tiene la implementación de los dos métodos invocados  en el **Controller**
 - ![[Todo los archivos contenidos dentro del paquete Auth-1732545812170.jpeg]]
## LoginRequest
- Este clase se encarga de serializar con los datos que el usuario enviaría al BackEnd para poder ingresar a la aplicación 
- ![[Todo los archivos contenidos dentro del paquete Auth-1732517508589.jpeg]]
## RegisterRequest
- Al igual que con la clase **LoginRequest**, está clase se va a encargar de serializar los datos para cuando un usuario quiere registrarse en la aplicación 
- ![[Todo los archivos contenidos dentro del paquete Auth-1732539745890.jpeg]]
## ResponseRequest
- Está clase se encarga de serealizar una la respuesta que trae el token o lo envía 
- ![[Todo los archivos contenidos dentro del paquete Auth-1732540007295.jpeg]]
- 