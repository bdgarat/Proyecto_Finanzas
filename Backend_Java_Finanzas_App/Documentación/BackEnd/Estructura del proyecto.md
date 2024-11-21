- Todo el código programable por los desarrolladores va estar contenido dentro del paquete **com.back.finanzas.app**
- El proyecto va estar separado en varias carpetas o paquetes que es donde se van a englobar las distintas clases que cumplen tareas puntuales 
- El mismo de primer momento va a contar con los siguientes paquetes 
	- **Modelos**: ahí se va a definir todas las clases que represente información en una base de datos 
	- **Controladores**: Acá se define las rutas y que funciones son las que atienden dichas peticiones 
	- **Servicios**: Los servicios son las funciones que atiene  o resuelven las peticiones echas por el usuario 
	- **Repositorios**: Son archivos que efectúan las consultas de base de datos 
- Aunque este modelo aparece generalmente en mucho proyectos eso no quiere decir que no se agreguen más paquetes conforme el proyecto vaya creciendo, en caso de crecer se documentara todo en este archivo tratando de dar un seguimiento lo mas minucioso posible 
![[Estructura del proyecto-1732206855731.jpeg]]