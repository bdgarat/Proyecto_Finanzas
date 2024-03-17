"""empty message

Revision ID: f88f3a803ffc
Revises: 29fb1b39a54c
Create Date: 2024-02-18 00:46:58.367974

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'f88f3a803ffc'
down_revision = '29fb1b39a54c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('codigos_supbi', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.add_column(sa.Column('last_updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.drop_index('ix_codigos_supbi_creacion_timestamp')
        batch_op.create_index(batch_op.f('ix_codigos_supbi_codigo'), ['codigo'], unique=True)
        batch_op.create_index(batch_op.f('ix_codigos_supbi_created_on'), ['created_on'], unique=False)
        batch_op.create_index(batch_op.f('ix_codigos_supbi_last_updated_on'), ['last_updated_on'], unique=False)
        batch_op.drop_column('creacion_timestamp')

    with op.batch_alter_table('propietarios', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.add_column(sa.Column('last_updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.drop_index('ix_propietarios_creacion_timestamp')
        batch_op.create_index(batch_op.f('ix_propietarios_created_on'), ['created_on'], unique=False)
        batch_op.create_index(batch_op.f('ix_propietarios_last_updated_on'), ['last_updated_on'], unique=False)
        batch_op.drop_column('creacion_timestamp')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('propietarios', schema=None) as batch_op:
        batch_op.add_column(sa.Column('creacion_timestamp', mysql.DATETIME(), nullable=False))
        batch_op.drop_index(batch_op.f('ix_propietarios_last_updated_on'))
        batch_op.drop_index(batch_op.f('ix_propietarios_created_on'))
        batch_op.create_index('ix_propietarios_creacion_timestamp', ['creacion_timestamp'], unique=False)
        batch_op.drop_column('last_updated_on')
        batch_op.drop_column('created_on')

    with op.batch_alter_table('codigos_supbi', schema=None) as batch_op:
        batch_op.add_column(sa.Column('creacion_timestamp', mysql.DATETIME(), nullable=False))
        batch_op.drop_index(batch_op.f('ix_codigos_supbi_last_updated_on'))
        batch_op.drop_index(batch_op.f('ix_codigos_supbi_created_on'))
        batch_op.drop_index(batch_op.f('ix_codigos_supbi_codigo'))
        batch_op.create_index('ix_codigos_supbi_creacion_timestamp', ['creacion_timestamp'], unique=False)
        batch_op.drop_column('last_updated_on')
        batch_op.drop_column('created_on')

    # ### end Alembic commands ###
