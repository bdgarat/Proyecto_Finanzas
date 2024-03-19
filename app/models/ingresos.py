from datetime import datetime

import sqlalchemy as sa
import sqlalchemy.orm as so
from app.db import db
from typing import List

class Ingreso(db.Model):
    __tablename__ = 'ingresos'

    id: so.Mapped[int] = so.mapped_column(sa.Integer, primary_key=True)
    descripcion: so.Mapped[str] = so.mapped_column(sa.String(256))
    fecha: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now())
    monto: so.Mapped[float] = so.mapped_column(sa.Float)
    tipo: so.Mapped[str] = so.mapped_column(sa.String(32), index=True)
    id_usuario: so.Mapped[int] = so.mapped_column(sa.ForeignKey("usuarios.id"))

    def __repr__(self):
        return f'Ingreso ({self.monto}, {self.descripcion}, {self.id_usuario})'
    
    def __init__(self, id_usuario, descripcion, monto, tipo, fecha):
        self.id_usuario = id_usuario
        self.descripcion = descripcion
        self.monto = monto
        self.tipo = tipo
        if fecha:
            self.fecha = fecha
        else:
            self.fecha = db.func.now()

    @classmethod
    def create(cls, ingreso):
        """Crea un ingreso"""
        db.session.add(ingreso)
        db.session.commit()