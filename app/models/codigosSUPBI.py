from typing import Optional
import sqlalchemy as sa
import sqlalchemy.orm as so
from sqlalchemy import LargeBinary

from app.db import db
from datetime import datetime, timezone

class CodigoSUPBI(db.Model):
    __tablename__ = 'codigos_supbi'

    id: so.Mapped[int] = so.mapped_column(sa.Integer, primary_key=True)
    codigo: so.Mapped[str] = so.mapped_column(sa.String(30), index=True, unique=True)
    id_vehiculo: so.Mapped[int] = so.mapped_column(sa.ForeignKey("vehiculos.id"))
    """from app.models.vehiculos import Vehiculo # Import cambiado de lugar por importacion circular
    vehiculo: so.Mapped[Vehiculo] = so.relationship(back_populates='codigos_supbi')"""
    id_provincia: so.Mapped[int] = so.mapped_column(sa.ForeignKey("provincias.id"))
    """from app.models.provincias import Provincia # Import cambiado de lugar por importacion circular
    provincia: so.Mapped[Provincia] = so.relationship(back_populates='codigos_supbi')"""
    id_municipio: so.Mapped[int] = so.mapped_column(sa.ForeignKey("municipios.id"))
    """from app.models.municipios import Municipio # Import cambiado de lugar por importacion circular
    municipio: so.Mapped[Municipio] = so.relationship(back_populates='codigos_supbi')"""
    id_propietario: so.Mapped[int] = so.mapped_column(sa.ForeignKey("propietarios.id"))
    """from app.models.propietarios import Propietario # Import cambiado de lugar por importacion circular
    propietario: so.Mapped[Propietario] = so.relationship(back_populates='codigos_supbi')"""
    id_usuario: so.Mapped[int] = so.mapped_column(sa.ForeignKey("usuarios.id"))
    """from app.models.usuarios import Usuario # Import cambiado de lugar por importacion circular
    usuario: so.Mapped[Usuario] = so.relationship(back_populates='codigos_supbi')"""
    rodado: so.Mapped[Optional[str]] = so.mapped_column(sa.String(30))
    imagen: so.Mapped[Optional[LargeBinary]] = so.mapped_column(sa.LargeBinary)
    created_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now()) #default=lambda: datetime.now(timezone.utc))
    last_updated_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now(), server_onupdate=db.func.now())

    def __repr__(self):
        return f'codigos_supbi({self.codigo})'

    def __init__(self, codigo, id_vehiculo, id_provincia, id_municipio, id_propietario, id_usuario, rodado = None, imagen = None):
        self.codigo = codigo
        self.id_vehiculo = id_vehiculo
        self.id_provincia = id_provincia
        self.id_municipio = id_municipio
        self.id_propietario = id_propietario
        self.id_usuario = id_usuario
        if rodado:
            self.rodado = rodado
        if imagen:
            self.imagen = imagen

    def add_rodado(self, rodado):
        self.rodado = rodado
        db.session.commit()

    def add_imagen(self, imagen):
        self.imagen = imagen
        db.session.commit()

    @classmethod
    def create(cls, codigo_supbi):
        """Crea un usuario"""
        db.session.add(codigo_supbi)
        db.session.commit()