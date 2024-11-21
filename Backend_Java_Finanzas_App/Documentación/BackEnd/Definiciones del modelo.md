## Documentos o referencias 
- [[Anotaciones]]
## Modelo Usuario 
- Este modelos va a representar la información del usuario de la aplicación finanzas
- El mismo va estar compuesto por una series de atributos que van a representar o guardar información del mismo 
- Los datos son los siguientes 
	- id: Integer 
	- Nombre: string 
	- Apellido: string
	- email: string
	- password: string 
- Su clase va a ser definida como **@Entity** indicando que va a representar una tabla en la base de datos 
- **@Table(name ='usuario')** Va a definir cual va ser el nombre de la tabla en la base de datos 
- Va contar también con la anotación @Data que va permitir al programador no escribir los Getters y Setters propios para manipular la información 
- ![[Definiciones del modelo-1732205999679.jpeg]]
- 