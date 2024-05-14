"""empty message

Revision ID: 92a625e5381f
Revises: 06c7c6c6e7a6
Create Date: 2024-05-12 19:29:29.198179

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '92a625e5381f'
down_revision = '06c7c6c6e7a6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=30), nullable=False))
        batch_op.add_column(sa.Column('password_hash', sa.String(length=256), nullable=False))
        batch_op.add_column(sa.Column('email', sa.String(length=50), nullable=False))
        batch_op.add_column(sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.add_column(sa.Column('last_updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.add_column(sa.Column('imagen', sa.LargeBinary(), nullable=True))
        batch_op.add_column(sa.Column('is_admin', sa.Boolean(), nullable=False))
        batch_op.add_column(sa.Column('is_verified', sa.Boolean(), nullable=False))
        batch_op.create_index(batch_op.f('ix_usuarios_created_on'), ['created_on'], unique=False)
        batch_op.create_index(batch_op.f('ix_usuarios_last_updated_on'), ['last_updated_on'], unique=False)
        batch_op.create_index(batch_op.f('ix_usuarios_username'), ['username'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_usuarios_username'))
        batch_op.drop_index(batch_op.f('ix_usuarios_last_updated_on'))
        batch_op.drop_index(batch_op.f('ix_usuarios_created_on'))
        batch_op.drop_column('is_verified')
        batch_op.drop_column('is_admin')
        batch_op.drop_column('imagen')
        batch_op.drop_column('last_updated_on')
        batch_op.drop_column('created_on')
        batch_op.drop_column('email')
        batch_op.drop_column('password_hash')
        batch_op.drop_column('username')

    # ### end Alembic commands ###
