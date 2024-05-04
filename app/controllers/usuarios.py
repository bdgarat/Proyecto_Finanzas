from app import token_required
from flask import Blueprint, jsonify


from app.models.usuarios import Usuario

bp = Blueprint('usuarios', __name__, url_prefix='/usuarios')
# User Database Route
# this route sends back list of users
@bp.route('/list', methods=['GET'])
@token_required
def get_all_users(current_user):
    """Devuelve un JSON con info de todos los usuarios"""
    current_user: Usuario
    if current_user.is_admin: # Si es admin, traigo el listado de todos los usuarios
        usuarios = Usuario.query.all()
    else: # Si NO es admin, rechazo el listado
        return jsonify({
            'message': 'No tiene permisos para esta operación'
        }), 401

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
            'last_updated_on': usuario.last_updated_on,
            'is_admin': usuario.is_admin
        })

    return jsonify({'usuarios': output}), 200


@bp.route('/whoami', methods=['GET'])
@token_required
def who_am_i(current_user):
    """Muestra info del usuario logueado via JWT"""
    current_user: Usuario
    output = {
        'username': current_user.username,
        'email': current_user.email,
        'saldo_actual': current_user.saldo_actual,
        'created_on': current_user.created_on,
        'last_updated_on': current_user.last_updated_on,
        'is_admin': current_user.is_admin
    }
    return jsonify(output), 200
