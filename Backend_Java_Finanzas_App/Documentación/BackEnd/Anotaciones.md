## Anotaciones para los modelos
- **@Entity:** Es una anotación que se utiliza en la API de persistencia Java(JPA) para definir un componente y especificar que una clase es una entidad 
- **Table(name=" "):** especifica la tabla principal para la entidad. Se pueden especificar tablas adicionales usando **@SecondaryTable**. Si no se especifica @Table para una entidad se aplican valores por defecto
	- En mi caso la utilizo para definir un nombre a la tabla
- **@Data:** genera toda la caldera que normalmente se asocia con simple POJOs(Plain Old Java Objects) => (Getters, Setters, toString, etc.)
- **@AllArgsConstructors:** genera un constructor con parámetro para campo en su clase 
- **@NoArgsConstructors:** genera un constructor sin parámetros. Si esto no es posible ( debido a los campos finales), en su lugar se producirá un error de compilación, a menos que se utilice **@NoArgsConstructor (force = True)**
- #### Anotaciones que acompañan siempre a un id 
	- **@Id:** Le indica a JPA cual es la clave primaria 
	- **@GeneratedValue(strategy = GenerationType.IDENTITY):** Le indica a spring como se crean los id y en que forma le va estableciendo los valores 
## Anotaciones para los controladores
**@Controller:** 
## Anotaciones para los servicios
