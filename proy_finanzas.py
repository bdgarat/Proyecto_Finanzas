import sqlalchemy as sa
import sqlalchemy.orm as so
from app.db import db
from app import app
from app.models.codigosSUPBI import CodigoSUPBI
from app.models.usuarios import Usuario
from app.models.vehiculos import Vehiculo
from app.models.propietarios import Propietario
from app.models.municipios import Municipio
from app.models.provincias import Provincia

@app.shell_context_processor
def make_shell_context():
    return {'sa': sa, 'so': so, 'db': db, 'Usuario': Usuario, 'Propietario': Propietario, 'Vehiculo': Vehiculo, 'Provincia': Provincia, 'Municipio': Municipio, 'CodigoSUPBI': CodigoSUPBI}
