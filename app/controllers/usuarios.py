from app import token_required
from flask import Blueprint, jsonify


from app.models.usuarios import Usuario

bp = Blueprint('usuarios', __name__, url_prefix='/usuarios')
# User Database Route
# this route sends back list of users
@bp.route('/users', methods=['GET'])
@token_required
def get_all_users(current_user):
    # querying the database
    # for all the entries in it
    usuarios = Usuario.query.all()
    # converting the query objects
    # to list of jsons
    output = []
    for usuario in usuarios:
        # appending the user data json
        # to the response list
        output.append({
            'username': usuario.username,
            'email': usuario.email,
            'saldo_actual': usuario.saldo_actual,
            'created_on': usuario.created_on,
            'last_updated_on': usuario.last_updated_on
        })

    return jsonify({'usuarios': output})
