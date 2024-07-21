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
    _username_char_limit = 30
    _password_hash_char_limit = 256
    _email_char_limit = 50

    id: so.Mapped[int] = so.mapped_column(sa.Integer, primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(_username_char_limit), index=True, unique=True)
    password_hash: so.Mapped[str] = so.mapped_column(sa.String(_password_hash_char_limit))
    email: so.Mapped[str] = so.mapped_column(sa.String(_email_char_limit))
    created_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now()) #default=lambda: datetime.now(timezone.utc))
    last_updated_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now(), server_onupdate=db.func.now())
    last_login: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now())
    imagen: so.Mapped[Optional[LargeBinary]] = so.mapped_column(sa.LargeBinary)
    is_admin: so.Mapped[bool] = so.mapped_column(sa.Boolean)
    is_verified: so.Mapped[bool] = so.mapped_column(sa.Boolean)

    def __init__(self, username, password_hash, email, imagen = None, is_admin = False, is_verified = False):
        self.username = username
        self.password_hash = password_hash
        self.email = email
        if imagen:
            self.imagen = imagen
        self.is_admin = is_admin
        self.created_on = db.func.now()
        self.last_updated_on = db.func.now()
        self.is_verified = is_verified

    def __repr__(self):
        return '<Usuario {}>'.format(self.username)

    @property
    def username_char_limit(self):
        """Devuelve el limite de caracteres del campo 'username'"""
        return self._username_char_limit

    @property
    def email_char_limit(self):
        """Devuelve el limite de caracteres del campo 'email'"""
        return self._email_char_limit

    @property
    def password_hash_char_limit(self):
        """Devuelve el limite de caracteres del campo 'password_hash'"""
        return self._password_hash_char_limit

    @classmethod
    def create(cls, user):
        """Crea un usuario en la base de datos"""
        db.session.add(user)
        db.session.commit()

    def update(self):
        """Actualiza un usuario en la base de datos"""
        db.session.commit()

    def delete(self):
        """Elimina un usuario de la base de datos"""
        db.session.delete(self)
        db.session.commit()
