from datetime import datetime

import sqlalchemy as sa
import sqlalchemy.orm as so
from app.db import db
from typing import List

class Ingreso(db.Model):
    @property
    def fecha(self):
        return self._fecha

    __tablename__ = 'ingresos'
    _descripcion_char_limit = 256
    _tipo_char_limit = 32

    _id: so.Mapped[int] = so.mapped_column(sa.Integer, primary_key=True)
    _descripcion: so.Mapped[str] = so.mapped_column(sa.String(_descripcion_char_limit))
    _fecha: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now())
    _created_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now())
    _last_updated_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now(),
                                                             server_onupdate=db.func.now())
    _monto: so.Mapped[float] = so.mapped_column(sa.Float)
    _tipo: so.Mapped[str] = so.mapped_column(sa.String(_tipo_char_limit))
    _id_usuario: so.Mapped[int] = so.mapped_column(sa.ForeignKey("usuarios.id"))
    # _is_deleted: so.Mapped[bool] = so.mapped_column(sa.Boolean)

    def __repr__(self):
        return f'Ingreso ({self.monto}, {self.descripcion}, {self.id_usuario})'

    def __init__(self, usuario, descripcion, monto, tipo, fecha: datetime = None): #, is_deleted=False):
        self._id_usuario = usuario
        self._descripcion = descripcion
        self._monto = monto
        self._tipo = tipo
        if fecha:
            self._fecha = fecha
        else:
            self._fecha = db.func.now()
        self._created_on = db.func.now()
        self._last_updated_on = db.func.now()
        # self._is_deleted = is_deleted

    @property
    def tipo_char_limit(self):
        return self._tipo_char_limit

    @property
    def descripcion_char_limit(self):
        return self._descripcion_char_limit

    @property
    def tipo(self):
        return self._tipo

    @tipo.setter
    def tipo(self, value):
        self._tipo = value

    @property
    def descripcion(self):
        return self._descripcion

    @descripcion.setter
    def descripcion(self, value):
        self._descripcion = value

    @property
    def id_usuario(self):
        return self._id_usuario

    @id_usuario.setter
    def id_usuario(self, value):
        self._id_usuario = value

    @property
    def last_updated_on(self):
        return self._last_updated_on

    @last_updated_on.setter
    def last_updated_on(self, value):
        self._last_updated_on = value

    """@property
    def is_deleted(self):
        return self._is_deleted

    @is_deleted.setter
    def is_deleted(self, value):
        self._is_deleted = value"""

    @property
    def fecha(self):
        return self._fecha

    @fecha.setter
    def fecha(self, value):
        self._fecha = value

    @property
    def created_on(self):
        return self._created_on

    @created_on.setter
    def created_on(self, value):
        self._created_on = value

    @property
    def monto(self):
        return self._monto

    @monto.setter
    def monto(self, value):
        self._monto = value

    @classmethod
    def create(cls, ingreso):
        """Crea un ingreso en la base de datos"""
        db.session.add(ingreso)
        db.session.commit()

    def update(self):
        """Actualiza un ingreso en la base de datos"""
        db.session.commit()

    def delete(self):
        """Elimina un ingreso de la base de datos"""
        db.session.delete(self)
        db.session.commit()