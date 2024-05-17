"""empty message

Revision ID: a0d2e3215045
Revises: 92a625e5381f
Create Date: 2024-05-12 19:30:39.211954

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a0d2e3215045'
down_revision = '92a625e5381f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('gastos', schema=None) as batch_op:
        batch_op.add_column(sa.Column('descripcion', sa.String(length=256), nullable=False))
        batch_op.add_column(sa.Column('fecha', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.add_column(sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.add_column(sa.Column('last_updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.add_column(sa.Column('monto', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('tipo', sa.String(length=32), nullable=False))
        batch_op.add_column(sa.Column('id_usuario', sa.Integer(), nullable=False))
        batch_op.create_index(batch_op.f('ix_gastos_created_on'), ['created_on'], unique=False)
        batch_op.create_index(batch_op.f('ix_gastos_fecha'), ['fecha'], unique=False)
        batch_op.create_index(batch_op.f('ix_gastos_last_updated_on'), ['last_updated_on'], unique=False)
        batch_op.create_foreign_key(None, 'usuarios', ['id_usuario'], ['id'])

    with op.batch_alter_table('ingresos', schema=None) as batch_op:
        batch_op.add_column(sa.Column('descripcion', sa.String(length=256), nullable=False))
        batch_op.add_column(sa.Column('fecha', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.add_column(sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.add_column(sa.Column('last_updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.add_column(sa.Column('monto', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('tipo', sa.String(length=32), nullable=False))
        batch_op.add_column(sa.Column('id_usuario', sa.Integer(), nullable=False))
        batch_op.create_index(batch_op.f('ix_ingresos_created_on'), ['created_on'], unique=False)
        batch_op.create_index(batch_op.f('ix_ingresos_fecha'), ['fecha'], unique=False)
        batch_op.create_index(batch_op.f('ix_ingresos_last_updated_on'), ['last_updated_on'], unique=False)
        batch_op.create_foreign_key(None, 'usuarios', ['id_usuario'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ingresos', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_index(batch_op.f('ix_ingresos_last_updated_on'))
        batch_op.drop_index(batch_op.f('ix_ingresos_fecha'))
        batch_op.drop_index(batch_op.f('ix_ingresos_created_on'))
        batch_op.drop_column('id_usuario')
        batch_op.drop_column('tipo')
        batch_op.drop_column('monto')
        batch_op.drop_column('last_updated_on')
        batch_op.drop_column('created_on')
        batch_op.drop_column('fecha')
        batch_op.drop_column('descripcion')

    with op.batch_alter_table('gastos', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_index(batch_op.f('ix_gastos_last_updated_on'))
        batch_op.drop_index(batch_op.f('ix_gastos_fecha'))
        batch_op.drop_index(batch_op.f('ix_gastos_created_on'))
        batch_op.drop_column('id_usuario')
        batch_op.drop_column('tipo')
        batch_op.drop_column('monto')
        batch_op.drop_column('last_updated_on')
        batch_op.drop_column('created_on')
        batch_op.drop_column('fecha')
        batch_op.drop_column('descripcion')

    # ### end Alembic commands ###
