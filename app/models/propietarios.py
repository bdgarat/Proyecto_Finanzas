from typing import Optional
import sqlalchemy as sa
import sqlalchemy.orm as so
from app.db import db

from typing import List
from datetime import datetime, timezone

class Propietario(db.Model):
    __tablename__ = 'propietarios'

    id: so.Mapped[int] = so.mapped_column(sa.Integer, primary_key=True)
    nombre: so.Mapped[str] = so.mapped_column(sa.String(30))
    apellido: so.Mapped[str] = so.mapped_column(sa.String(30))
    dni: so.Mapped[Optional[str]] = so.mapped_column(sa.String(30))
    email: so.Mapped[Optional[str]] = so.mapped_column(sa.String(30))
    created_on: so.Mapped[datetime] = so.mapped_column(index=True,
                                                       server_default=db.func.now())  # default=lambda: datetime.now(timezone.utc))
    last_updated_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now(),
                                                            server_onupdate=db.func.now())
    """from app.models.codigosSUPBI import CodigoSUPBI # Import cambiado de lugar por importacion circular
    codigos_supbi: so.Mapped[List["CodigoSUPBI"]] = so.relationship(back_populates='propietario')"""

    def __repr__(self):
        return f'Propietario({self.apellido}, {self.nombre}, DNI: {self.dni}, E-Mail: {self.email})'
    
    def __init__(self, nombre, apellido, dni = None, email = None):
        if email:
            self.email = email
        if dni:
            self.dni = dni
        self.apellido = apellido
        self.nombre = nombre

    def add_dni(self, dni):
        self.dni = dni
        db.session.commit()

    def add_email(self, email):
        self.email = email
        db.session.commit()

    @classmethod
    def create(cls, user):
        """Crea un usuario"""
        db.session.add(user)
        db.session.commit()