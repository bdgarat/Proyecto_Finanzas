from datetime import datetime

import sqlalchemy as sa
import sqlalchemy.orm as so
from app.db import db
from typing import List

class Gasto(db.Model):
    __tablename__ = 'gastos'
    _descripcion_char_limit = 256
    _tipo_char_limit = 32

    id: so.Mapped[int] = so.mapped_column(sa.Integer, primary_key=True)
    descripcion: so.Mapped[str] = so.mapped_column(sa.String(_descripcion_char_limit))
    fecha: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now(), server_onupdate=db.func.now())
    monto: so.Mapped[float] = so.mapped_column(sa.Float)
    tipo: so.Mapped[str] = so.mapped_column(sa.String(_tipo_char_limit))
    id_usuario: so.Mapped[int] = so.mapped_column(sa.ForeignKey("usuarios.id"))

    def __repr__(self):
        return f'Gasto ({self.monto}, {self.descripcion}, {self.id_usuario})'

    def __init__(self, usuario, descripcion, monto, tipo, fecha: datetime = None):
        self.id_usuario = usuario
        self.descripcion = descripcion
        self.monto = monto
        self.tipo = tipo
        if fecha:
            self.fecha = fecha

    @classmethod
    def create(cls, gasto):
        """Crea un gasto"""
        db.session.add(gasto)
        db.session.commit()

    def get_descripcion_characters_limit(self):
        """Devuelve el limite de caracteres del campo 'descripcion'"""
        return self._descripcion_char_limit

    def get_tipo_characters_limit(self):
        """Devuelve el limite de caracteres del campo 'tipo'"""
        return self._tipo_char_limit