"""empty message

Revision ID: 0843a75b3ab2
Revises: 
Create Date: 2024-02-14 01:06:59.425168

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0843a75b3ab2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('propietarios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=30), nullable=False),
    sa.Column('apellido', sa.String(length=30), nullable=False),
    sa.Column('dni', sa.String(length=30), nullable=True),
    sa.Column('email', sa.String(length=30), nullable=True),
    sa.Column('creacion_timestamp', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('propietarios', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_propietarios_creacion_timestamp'), ['creacion_timestamp'], unique=False)

    op.create_table('provincias',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=30), nullable=False),
    sa.Column('sigla', sa.String(length=2), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('usuarios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=30), nullable=False),
    sa.Column('sigla', sa.String(length=2), nullable=True),
    sa.Column('tipo', sa.Integer(), nullable=False),
    sa.Column('password_hash', sa.String(length=255), nullable=False),
    sa.Column('email', sa.String(length=30), nullable=True),
    sa.Column('creacion_timestamp', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_usuarios_creacion_timestamp'), ['creacion_timestamp'], unique=False)
        batch_op.create_index(batch_op.f('ix_usuarios_username'), ['username'], unique=True)

    op.create_table('vehiculos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('marca', sa.String(length=30), nullable=False),
    sa.Column('modelo', sa.String(length=30), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('municipios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('idProvincia', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=30), nullable=False),
    sa.Column('sigla', sa.String(length=2), nullable=False),
    sa.ForeignKeyConstraint(['idProvincia'], ['provincias.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('codigos_supbi',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('codigo', sa.String(length=30), nullable=False),
    sa.Column('idVehiculo', sa.Integer(), nullable=False),
    sa.Column('idProvincia', sa.Integer(), nullable=False),
    sa.Column('idMunicipio', sa.Integer(), nullable=False),
    sa.Column('idPropietario', sa.Integer(), nullable=False),
    sa.Column('idUsuario', sa.Integer(), nullable=False),
    sa.Column('rodado', sa.String(length=30), nullable=True),
    sa.Column('creacion_timestamp', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['idMunicipio'], ['municipios.id'], ),
    sa.ForeignKeyConstraint(['idPropietario'], ['propietarios.id'], ),
    sa.ForeignKeyConstraint(['idProvincia'], ['provincias.id'], ),
    sa.ForeignKeyConstraint(['idUsuario'], ['usuarios.id'], ),
    sa.ForeignKeyConstraint(['idVehiculo'], ['vehiculos.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('codigos_supbi', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_codigos_supbi_creacion_timestamp'), ['creacion_timestamp'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('codigos_supbi', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_codigos_supbi_creacion_timestamp'))

    op.drop_table('codigos_supbi')
    op.drop_table('municipios')
    op.drop_table('vehiculos')
    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_usuarios_username'))
        batch_op.drop_index(batch_op.f('ix_usuarios_creacion_timestamp'))

    op.drop_table('usuarios')
    op.drop_table('provincias')
    with op.batch_alter_table('propietarios', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_propietarios_creacion_timestamp'))

    op.drop_table('propietarios')
    # ### end Alembic commands ###
