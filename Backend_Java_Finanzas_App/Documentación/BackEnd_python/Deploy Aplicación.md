# Deploy del bakcend
- ### Render  - paso a paso de como hacerlo 
	1. Todo lo que esta escrito en el archivo raíz, en mi caso el archivo **__init__**, se tiene meter dentro de una función
		1. En el ejemplo, el pone de nombre a la función **crear_app**
		2. También agrega un **return** para devolver el parámetro **app**
		3. Dentro del cuerpo **if __name__ == "__main__"** llama a la función crear_app() y todo sigue su curso normal de ejecución
	2. Crear el archivo **requirements.txt**
		1. **Dependencias que el instala**
			1. flask
			2.  dentro de los requerimientos el agregar un dependencia para trabajar con variables virtuales que se llama "python-dotenv"
			3. pymongo[srv]
			4. gunicorn
	3. Crear un repositorio para el backend
		1. En este caso el ya tiene los archivos en el directorio principal, no como en mi caso que los tengo dentro de la carpeta app, tengo que evaluar si eso se puede dejar de esta manera o modificar donde se encuentran.
	4. Crear un cuenta en render 
		1. Se recomienda hacerlo con github
	5. Utilizar render
		1.  Selecciono web servicies
		2. selecciono la opción "build and deploy a git repository"
		3. Selecciono el repositorio
		4. Configuración
			1. Se le da un nombre al servicio
			2. Se selecciona el servidor donde va a vivir la aplicación (se recomienda el lugar más cercano a donde se va a utilizar  la aplicación)
			3. Se selecciona la rama del repositorio
			4.  Se puede seleccionar la carpeta donde va estar el archivo raíz 
			5. Runtime -- no se que es
			6. Build command : hay uno por defecto que es para instalar las dependencias 
			7. Start command: 
				1. El usuario en el video pone lo siguiente 
					1. gunicorn "app:crear_app()"
			8. Opción advances (se encuentra abajo del plan de pago)
## Primer informe 
``` log
Traceback (most recent call last):

File "/opt/render/project/src/.venv/bin/gunicorn", line 8, in <module>

sys.exit(run())

^^^^^

File "/opt/render/project/src/.venv/lib/python3.11/site-packages/gunicorn/app/wsgiapp.py", line 67, in run

WSGIApplication("%(prog)s [OPTIONS] [APP_MODULE]").run()

File "/opt/render/project/src/.venv/lib/python3.11/site-packages/gunicorn/app/base.py", line 236, in run

super().run()

File "/opt/render/project/src/.venv/lib/python3.11/site-packages/gunicorn/app/base.py", line 72, in run

Arbiter(self).run()

^^^^^^^^^^^^^

File "/opt/render/project/src/.venv/lib/python3.11/site-packages/gunicorn/arbiter.py", line 58, in __init__

self.setup(app)

File "/opt/render/project/src/.venv/lib/python3.11/site-packages/gunicorn/arbiter.py", line 118, in setup

self.app.wsgi()

File "/opt/render/project/src/.venv/lib/python3.11/site-packages/gunicorn/app/base.py", line 67, in wsgi

self.callable = self.load()

^^^^^^^^^^^

File "/opt/render/project/src/.venv/lib/python3.11/site-packages/gunicorn/app/wsgiapp.py", line 58, in load

return self.load_wsgiapp()

^^^^^^^^^^^^^^^^^^^

File "/opt/render/project/src/.venv/lib/python3.11/site-packages/gunicorn/app/wsgiapp.py", line 48, in load_wsgiapp

return util.import_app(self.app_uri)

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

File "/opt/render/project/src/.venv/lib/python3.11/site-packages/gunicorn/util.py", line 371, in import_app

mod = importlib.import_module(module)

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

File "/usr/local/lib/python3.11/importlib/__init__.py", line 126, in import_module

return _bootstrap._gcd_import(name[level:], package, level)

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

File "<frozen importlib._bootstrap>", line 1204, in _gcd_import

File "<frozen importlib._bootstrap>", line 1176, in _find_and_load

File "<frozen importlib._bootstrap>", line 1140, in _find_and_load_unlocked

ModuleNotFoundError: No module named 'app'

==> Exited with status 1
```
 - **Conclusión:** Se sigue le dando el mismo error que en Railway. No encuentra el modulo APP. 
# Deploy del frontend
# Deploy de la base de datos