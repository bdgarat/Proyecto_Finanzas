# Proyecto Finanzas

## Iniciar ambiente (Backend)

### Requisitos

- python3
- virtualenv
- MySQL

### Preparacion de ambiente (sobre Linux)

```bash
# Para crear el entorno virtual
$ virtualenv -p python3 venv
# Para iniciar el entorno virtual
$ .venv/bin/activate
# Instalar las dependencias dentro del entorno virtual
$ pip3 install -r requirements.txt
# En el directorio raiz
$ FLASK_ENV=dev python run.py
```

### Preparacion de ambiente (sobre Windows)

```bash
# Para crear el entorno virtual
$ python3 -m venv venv
# Para iniciar el entorno virtual
$ venv\\Scripts\\activate.bat
# Instalar las dependencias dentro del entorno virtual
$ pip3 install -r requirements.txt
# En el directorio raiz
$ set FLASK_ENV=development
```

### Configuración de Base de Datos (MySQL)

Configurar los valores relacionados a la configuración de la base de datos utilizada. Por defecto, son los siguientes:

```bash
 db_config = {
     "USER": "root",
     "PASSWORD": "1234",
     "HOST": "localhost",
     "DATABASE": "proyecto_finanzas_develop"
 }
```

Luego, para que el backend refleje automaticamente la configuracion de las tablas en la base de datos, ejecutar las siguientes instrucciones:

```bash
# Agregar los cambios de modelos a db
$ flask db migrate
# Commitear los cambios de modelos a db
$ flask db upgrade
```

IMPORTANTE: En caso de que exista algun error en la migracion de modelos a db, borrar el directorio "backend/migrations" y ejecutar las siguientes instrucciones:

```bash
# Inicializa el servicio de migraciones a db
$ flask db init
# Agregar los cambios de modelos a db
$ flask db migrate
# Commitear los cambios de modelos a db
$ flask db upgrade
```

Hecho esto, ejecutar el backend con el siguiente comando:

```bash
# Correr Flask
$ flask run
```

Para salir del entorno virtual, ejecutar:

```bash
$ deactivate
```

## Front 
  ### Aplicaciones necesarias
     - nodejs
  ## Instala dependencias necesarias
  ### Para instalar las dependencias y levantar el front hay que estar parado dentro de la carpeta View
    ``` bash
    $ npm i 
    ```
  ## Levantar el front
   ``` bash
    $ npm run dev 
   ```