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
- **@Controller:** Es una anotación de Spring que se utiliza como punto de entrada a la aplicación 
- **@RestController:** Marca una clase como controlador de Spring MVC que maneja solicitudes HTTP
- **RequestMapping:** Se usa para asignar solicitudes web a clases o métodos de controlador 
	- Se escribe entre paréntesis el nombre de la URL
- **@Autowired:** Se utiliza para inyectar dependencias automaticamente en un proyecto Spring 
	- ![[Anotaciones-1732203267969.jpeg]]
- **@ResponseBody:** Indica a Spring que debe convertir automáticamente el valor devuelto por el método del controlador en una representación adecuada del recurso y enviarla en el cuerpo de la respuesta  HTTP
- **RequestBody:** Asigna el cuerpo de una petición HTTP a un objeto de transferencia o dominio 
- **RequestHeader:** verifica el encabezado con el nombre especificado dentro de la anotación y vincula su valor al parámetro del método del controlador
- **@GetMapping:** La anotación se utiliza para mapear solicitudes HTTP GET a métodos de controlador especifico 
- **@PostMapping:** La anotación se utiliza para mapear solicitudes HTTP POST a métodos de controlador especifico 
- **@PutMapping:** La anotación se utiliza para mapear solicitudes HTTP PUT a métodos de controlador especifico 
- **@DeleteMapping:** La anotación se utiliza para mapear solicitudes HTTP DELETE a métodos de controlador especifico 
## Anotaciones para los servicios
- **@Service:** Se usa para construir una clase Servicio que habitualmente se conecta a varios repositorios y agrupa su funcionalidad 
## Anotaciones sobre configuración 
- **@Configuration:** Anotación encargada de definir que la clase es una clase de configuración para el framework
- **@EnableWebSecurity:** habilita las funciones de seguridad web de Spring Security en una aplicación Spring Boot
- **@Bean:** Estos representan los componentes que el framework gestiona y utiliza para mantener el flujo de dependencias 