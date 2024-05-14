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

<<<<<<< HEAD
    _id: so.Mapped[int] = so.mapped_column(sa.Integer, primary_key=True)
    _username: so.Mapped[str] = so.mapped_column(sa.String(_username_char_limit), index=True, unique=True)
    _password_hash: so.Mapped[str] = so.mapped_column(sa.String(_password_hash_char_limit))
    _email: so.Mapped[str] = so.mapped_column(sa.String(_email_char_limit))
    _created_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now()) #default=lambda: datetime.now(timezone.utc))
    _last_updated_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now(), server_onupdate=db.func.now())
    _imagen: so.Mapped[Optional[LargeBinary]] = so.mapped_column(sa.LargeBinary)
    # _saldo_actual: so.Mapped[float] = so.mapped_column(sa.Float)
    _is_admin: so.Mapped[bool] = so.mapped_column(sa.Boolean)
    _is_verified: so.Mapped[bool] = so.mapped_column(sa.Boolean)
    # _is_deleted: so.Mapped[bool] = so.mapped_column(sa.Boolean)

    def __init__(self, username, password_hash, email, imagen = None, is_admin = False, is_verified = False):#, is_deleted = False):
        self._username = username
        self._password_hash = password_hash
        self._email = email
        if imagen:
            self._imagen = imagen
        self._is_admin = is_admin
        self._created_on = db.func.now()
        self._last_updated_on = db.func.now()
        self._is_verified = is_verified
        # self._is_deleted = is_deleted

    @property
    def password_hash_char_limit(self):
        return self._password_hash_char_limit

    @property
    def email_char_limit(self):
        return self._email_char_limit

    @property
    def username_char_limit(self):
        return self._username_char_limit

    @property
    def tablename(self):
        return self.__tablename__

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, value):
        self._password_hash = value

    @property
    def is_verified(self):
        return self._is_verified

    @is_verified.setter
    def is_verified(self, value):
        self._is_verified = value

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        self._email = value

    """@property
    def saldo_actual(self):
        return self._saldo_actual

    @saldo_actual.setter
    def saldo_actual(self, value):
        self._saldo_actual = value"""

    @property
    def last_updated_on(self):
        return self._last_updated_on

    @last_updated_on.setter
    def last_updated_on(self, value):
        self._last_updated_on = value

    @property
    def is_admin(self):
        return self._is_admin

    @is_admin.setter
    def is_admin(self, value):
        self._is_admin = value

    """@property
    def is_deleted(self):
        return self._is_deleted

    @is_deleted.setter
    def is_deleted(self, value):
        self._is_deleted = value"""

    @property
    def created_on(self):
        return self._created_on

    @created_on.setter
    def created_on(self, value):
        self._created_on = value

    @property
    def imagen(self):
        return self._imagen

    @imagen.setter
    def imagen(self, value):
        self._imagen = value

    @property
    def username(self):
        return self._username

    @username.setter
    def username(self, value):
        self._username = value

    def __repr__(self):
        return '<Usuario {}>'.format(self._username)
=======
    id: so.Mapped[int] = so.mapped_column(sa.Integer, primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(_username_char_limit), index=True, unique=True)
    password_hash: so.Mapped[str] = so.mapped_column(sa.String(_password_hash_char_limit))
    email: so.Mapped[str] = so.mapped_column(sa.String(_email_char_limit))
    created_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now()) #default=lambda: datetime.now(timezone.utc))
    last_updated_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now(), server_onupdate=db.func.now())
    imagen: so.Mapped[Optional[LargeBinary]] = so.mapped_column(sa.LargeBinary)
    # saldo_actual: so.Mapped[float] = so.mapped_column(sa.Float)
    is_admin: so.Mapped[bool] = so.mapped_column(sa.Boolean)
    is_verified: so.Mapped[bool] = so.mapped_column(sa.Boolean)
    # is_deleted: so.Mapped[bool] = so.mapped_column(sa.Boolean)

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
>>>>>>> develop

    """@login.user_loader
    def load_user(user_id):
        return db.session.get(Usuario, int(user_id))"""

<<<<<<< HEAD
=======
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

>>>>>>> develop
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


# Deprecated methods

'''    def get_saldo(self):
        """Devuelve el saldo actual del usuario"""
        return self._saldo_actual

<<<<<<< HEAD
    def get_username_characters_limit(self):
        """Devuelve el limite de caracteres del campo 'username'"""
        return self._username_char_limit

    def get_email_characters_limit(self):
        """Devuelve el limite de caracteres del campo 'email'"""
        return self._email_char_limit

    def get_password_hash_characters_limit(self):
        """Devuelve el limite de caracteres del campo 'password_hash'"""
        return self._password_hash_char_limit
=======
>>>>>>> develop

    def add_imagen(self, imagen):
        """Agrega la imagen al perfil del usuario"""
        self._imagen = imagen
        db.session.commit()

    def substract_monto(self, unMonto: float) -> bool:
        """Le quita a monto el valor traido por parametro y devuelve True. Si no se puede, no hace nada y devuelve False"""
        if unMonto > self._saldo_actual:
            return False
        else:
            self._saldo_actual -= unMonto
            db.session.commit()
            return True

    def add_monto(self, unMonto: float) -> float:
        """Le suma a monto el valor traido por parametro y devuelve el nuevo monto"""
        self._saldo_actual += unMonto
        db.session.commit()
        return True'''
