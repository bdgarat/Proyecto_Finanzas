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
    email: so.Mapped[Optional[str]] = so.mapped_column(sa.String(50))
    created_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now()) #default=lambda: datetime.now(timezone.utc))
    last_updated_on: so.Mapped[datetime] = so.mapped_column(index=True, server_default=db.func.now(), server_onupdate=db.func.now())
    imagen: so.Mapped[Optional[LargeBinary]] = so.mapped_column(sa.LargeBinary)
    saldo_actual: so.Mapped[int] = so.mapped_column(sa.Integer)


    def __init__(self, username, saldo_actual, password_hash, email = None):
        self.username = username
        self.saldo_actual = saldo_actual
        self.password_hash = password_hash
        if email:
            self.email = email

    def add_email(self, email):
        self.email = email
        db.session.commit()

    def add_imagen(self, imagen):
        self.imagen = imagen
        db.session.commit()

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




