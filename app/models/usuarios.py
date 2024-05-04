from typing import Optional
import sqlalchemy as sa
import sqlalchemy.orm as so
from flask_login import UserMixin
from sqlalchemy import LargeBinary
from werkzeug.security import generate_password_hash, check_password_hash
from app.db import db
from typing import List
from datetime import datetime, timezone

class Usuario(UserMixin, db.Model):
    __tablename__ = 'usuarios'

    id: so.Mapped[int] = so.mapped_column(sa.Integer, primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(30), index=True, unique=True)
    password_hash: so.Mapped[str] = so.mapped_column(sa.String(256))
    email: so.Mapped[str] = so.mapped_column(sa.String(50))
    created_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now()) #default=lambda: datetime.now(timezone.utc))
    last_updated_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now(), server_onupdate=db.func.now())
    imagen: so.Mapped[Optional[LargeBinary]] = so.mapped_column(sa.LargeBinary)
    saldo_actual: so.Mapped[float] = so.mapped_column(sa.Float)
    is_admin: so.Mapped[bool] = so.mapped_column(sa.Boolean)


    def __init__(self, username, password_hash, email, saldo_actual = 0.0, imagen = None, is_admin = False):
        self.username = username
        self.saldo_actual = saldo_actual
        self.password_hash = password_hash
        self.email = email
        if imagen:
            self.imagen = imagen
        self.is_admin = is_admin

    def get_saldo(self):
        """Devuelve el saldo actual del usuario"""
        return self.saldo_actual

    def add_imagen(self, imagen):
        """Agrega la imagen al perfil del usuario"""
        self.imagen = imagen
        db.session.commit()

    def substract_monto(self, unMonto: float) -> bool:
        """Le quita a monto el valor traido por parametro y devuelve el nuevo monto. Si no se puede, no hace nada y devuelve 'None'"""
        if unMonto > self.saldo_actual:
            return False
        else:
            self.saldo_actual -= unMonto
            db.session.commit()
            return True

    def add_monto(self, unMonto: float) -> float:
        """Le suma a monto el valor traido por parametro y devuelve el nuevo monto"""
        self.saldo_actual += unMonto
        db.session.commit()
        return True

    def __repr__(self):
        return '<Usuario {}>'.format(self.username)

    """@login.user_loader
    def load_user(user_id):
        return db.session.get(Usuario, int(user_id))"""

    @classmethod
    def create(cls, user):
        """Crea un usuario"""
        db.session.add(user)
        db.session.commit()




