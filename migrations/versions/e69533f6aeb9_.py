"""empty message

Revision ID: e69533f6aeb9
Revises: 
Create Date: 2024-05-20 20:51:40.690999

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e69533f6aeb9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('gastos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('descripcion', sa.String(length=256), nullable=False),
    sa.Column('fecha', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('last_updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('monto', sa.Float(), nullable=False),
    sa.Column('tipo', sa.String(length=32), nullable=False),
    sa.Column('id_usuario', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_usuario'], ['usuarios.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('gastos', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_gastos_created_on'), ['created_on'], unique=False)
        batch_op.create_index(batch_op.f('ix_gastos_fecha'), ['fecha'], unique=False)
        batch_op.create_index(batch_op.f('ix_gastos_last_updated_on'), ['last_updated_on'], unique=False)

    op.create_table('ingresos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('descripcion', sa.String(length=256), nullable=False),
    sa.Column('fecha', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('last_updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('monto', sa.Float(), nullable=False),
    sa.Column('tipo', sa.String(length=32), nullable=False),
    sa.Column('id_usuario', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_usuario'], ['usuarios.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('ingresos', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_ingresos_created_on'), ['created_on'], unique=False)
        batch_op.create_index(batch_op.f('ix_ingresos_fecha'), ['fecha'], unique=False)
        batch_op.create_index(batch_op.f('ix_ingresos_last_updated_on'), ['last_updated_on'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ingresos', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_ingresos_last_updated_on'))
        batch_op.drop_index(batch_op.f('ix_ingresos_fecha'))
        batch_op.drop_index(batch_op.f('ix_ingresos_created_on'))

    op.drop_table('ingresos')
    with op.batch_alter_table('gastos', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_gastos_last_updated_on'))
        batch_op.drop_index(batch_op.f('ix_gastos_fecha'))
        batch_op.drop_index(batch_op.f('ix_gastos_created_on'))

    op.drop_table('gastos')
    # ### end Alembic commands ###