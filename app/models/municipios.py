import sqlalchemy as sa
import sqlalchemy.orm as so
from app.db import db
from typing import List

class Municipio(db.Model):
    __tablename__ = 'municipios'

    id: so.Mapped[int] = so.mapped_column(sa.Integer, primary_key=True)
    id_provincia: so.Mapped[int] = so.mapped_column(sa.ForeignKey("provincias.id"))
    nombre: so.Mapped[str] = so.mapped_column(sa.String(30))
    sigla: so.Mapped[str] = so.mapped_column(sa.String(2))
    """from app.models.provincias import Provincia # Import cambiado de lugar por importacion circular
    provincia: so.Mapped[Provincia] = so.relationship(back_populates='municipios')
    from app.models.codigosSUPBI import CodigoSUPBI # Import cambiado de lugar por importacion circular
    codigos_supbi: so.Mapped[List["CodigoSUPBI"]] = so.relationship(back_populates='municipio')"""

    def __repr__(self):
        return f'Municipio({self.nombre}, {self.sigla})'

    def __init__(self, id_provincia, nombre, sigla):
        self.sigla = sigla
        self.nombre = nombre
        self.id_provincia = id_provincia

    @classmethod
    def create(cls, user):
        """Crea un usuario"""
        db.session.add(user)
        db.session.commit()