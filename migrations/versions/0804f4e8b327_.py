"""empty message

Revision ID: 0804f4e8b327
Revises: 9dd922bedeee
Create Date: 2024-02-18 13:22:34.531883

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '0804f4e8b327'
down_revision = '9dd922bedeee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('codigos_supbi', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id_vehiculo', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('id_provincia', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('id_municipio', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('id_propietario', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('id_usuario', sa.Integer(), nullable=False))
        batch_op.drop_constraint('codigos_supbi_ibfk_5', type_='foreignkey')
        batch_op.drop_constraint('codigos_supbi_ibfk_4', type_='foreignkey')
        batch_op.drop_constraint('codigos_supbi_ibfk_3', type_='foreignkey')
        batch_op.drop_constraint('codigos_supbi_ibfk_1', type_='foreignkey')
        batch_op.drop_constraint('codigos_supbi_ibfk_2', type_='foreignkey')
        batch_op.create_foreign_key(None, 'propietarios', ['id_propietario'], ['id'])
        batch_op.create_foreign_key(None, 'municipios', ['id_municipio'], ['id'])
        batch_op.create_foreign_key(None, 'vehiculos', ['id_vehiculo'], ['id'])
        batch_op.create_foreign_key(None, 'provincias', ['id_provincia'], ['id'])
        batch_op.create_foreign_key(None, 'usuarios', ['id_usuario'], ['id'])
        batch_op.drop_column('idMunicipio')
        batch_op.drop_column('idVehiculo')
        batch_op.drop_column('idUsuario')
        batch_op.drop_column('idPropietario')
        batch_op.drop_column('idProvincia')

    with op.batch_alter_table('municipios', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id_provincia', sa.Integer(), nullable=False))
        batch_op.drop_constraint('municipios_ibfk_1', type_='foreignkey')
        batch_op.create_foreign_key(None, 'provincias', ['id_provincia'], ['id'])
        batch_op.drop_column('idProvincia')

    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.alter_column('password_hash',
               existing_type=mysql.VARCHAR(length=256),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.alter_column('password_hash',
               existing_type=mysql.VARCHAR(length=256),
               nullable=True)

    with op.batch_alter_table('municipios', schema=None) as batch_op:
        batch_op.add_column(sa.Column('idProvincia', mysql.INTEGER(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('municipios_ibfk_1', 'provincias', ['idProvincia'], ['id'])
        batch_op.drop_column('id_provincia')

    with op.batch_alter_table('codigos_supbi', schema=None) as batch_op:
        batch_op.add_column(sa.Column('idProvincia', mysql.INTEGER(), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('idPropietario', mysql.INTEGER(), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('idUsuario', mysql.INTEGER(), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('idVehiculo', mysql.INTEGER(), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('idMunicipio', mysql.INTEGER(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('codigos_supbi_ibfk_2', 'propietarios', ['idPropietario'], ['id'])
        batch_op.create_foreign_key('codigos_supbi_ibfk_1', 'municipios', ['idMunicipio'], ['id'])
        batch_op.create_foreign_key('codigos_supbi_ibfk_3', 'provincias', ['idProvincia'], ['id'])
        batch_op.create_foreign_key('codigos_supbi_ibfk_4', 'usuarios', ['idUsuario'], ['id'])
        batch_op.create_foreign_key('codigos_supbi_ibfk_5', 'vehiculos', ['idVehiculo'], ['id'])
        batch_op.drop_column('id_usuario')
        batch_op.drop_column('id_propietario')
        batch_op.drop_column('id_municipio')
        batch_op.drop_column('id_provincia')
        batch_op.drop_column('id_vehiculo')

    # ### end Alembic commands ###
