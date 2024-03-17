import sqlalchemy as sa
import sqlalchemy.orm as so
from app.db import db
from typing import List

class Vehiculo(db.Model):
    __tablename__ = 'vehiculos'

    id: so.Mapped[int] = so.mapped_column(sa.Integer, primary_key=True)
    marca: so.Mapped[str] = so.mapped_column(sa.String(30))
    modelo: so.Mapped[str] = so.mapped_column(sa.String(30))
    """from app.models.codigosSUPBI import CodigoSUPBI # Import cambiado de lugar por importacion circular
    codigos_supbi: so.Mapped[List["CodigoSUPBI"]] = so.relationship(back_populates='vehiculo')"""

    def __repr__(self):
        return f'Vehiculo({self.marca}, {self.modelo})'
    
    def __init__(self, marca, modelo):
        self.modelo = modelo
        self.marca = marca

    @classmethod
    def create(cls, user):
        """Crea un usuario"""
        db.session.add(user)
        db.session.commit()