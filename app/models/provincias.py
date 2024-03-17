import sqlalchemy as sa
import sqlalchemy.orm as so
from app.db import db
from typing import List

class Provincia(db.Model):
    __tablename__ = 'provincias'

    id: so.Mapped[int] = so.mapped_column(sa.Integer, primary_key=True)
    nombre: so.Mapped[str] = so.mapped_column(sa.String(30))
    sigla: so.Mapped[str] = so.mapped_column(sa.String(2))
    """from app.models.municipios import Municipio # Import cambiado de lugar por importacion circular
    municipios: so.Mapped[List["Municipio"]] = so.relationship(back_populates='provincia')
    from app.models.codigosSUPBI import CodigoSUPBI # Import cambiado de lugar por importacion circular
    codigos_supbi: so.Mapped[List["CodigoSUPBI"]] = so.relationship(back_populates='provincia')"""

    def __repr__(self):
        return f'Provincia({self.nombre}, {self.sigla})'
    
    def __init__(self, nombre, sigla):
        self.sigla = sigla
        self.nombre = nombre

    @classmethod
    def create(cls, user):
        """Crea un usuario"""
        db.session.add(user)
        db.session.commit()