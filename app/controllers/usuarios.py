from flask_cors import cross_origin
from werkzeug.security import generate_password_hash

from app import token_required
from flask import Blueprint, jsonify, request

from app.models.gastos import Gasto
from app.models.ingresos import Ingreso
from app.models.usuarios import Usuario
from app.utils.email_validation import validar_email

from app import config as cfg

bp = Blueprint('usuarios', __name__, url_prefix='/usuarios')

<<<<<<< HEAD
@bp.route('/get_saldo_actual', methods=['GET'])
@cross_origin()
@token_required
def get_saldo(current_user):
=======
@bp.route('/saldo', methods=['GET'])
@cross_origin()
@token_required
def saldo(current_user):
>>>>>>> develop

    # Obtengo el id de usuario del token
    current_user: Usuario
    id_usuario = current_user.get_id()

<<<<<<< HEAD
    saldo_actual = 0.0

    ingresos = Ingreso.query.filter_by(id_usuario=id_usuario).all()
    for ingreso in ingresos:
        saldo_actual += ingreso.monto

    gastos = Gasto.query.filter_by(id_usuario=id_usuario).all()
    for gasto in gastos:
        saldo_actual -= gasto.monto

    return jsonify({
        'saldo_actual': saldo_actual
=======
    saldo = 0.0

    ingresos = Ingreso.query.filter_by(id_usuario=id_usuario).all()
    for ingreso in ingresos:
        saldo += ingreso.monto

    gastos = Gasto.query.filter_by(id_usuario=id_usuario).all()
    for gasto in gastos:
        saldo -= gasto.monto

    return jsonify({
        'saldo': saldo
>>>>>>> develop
    }), 200
@bp.route('/list', methods=['GET'])
@cross_origin()
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
            'id': usuario.get_id(),
            'username': usuario.username,
            'email': usuario.email,
            'created_on': usuario.created_on,
            'last_updated_on': usuario.last_updated_on,
            'is_admin': usuario.is_admin,
<<<<<<< HEAD
            'is_verified': current_user.is_verified
=======
            'is_verified': usuario.is_verified
>>>>>>> develop
        })

    return jsonify({'usuarios': output}), 200


@bp.route('/whoami', methods=['GET'])
@cross_origin()
@token_required
def who_am_i(current_user):
    """Muestra info del usuario logueado via JWT"""
    current_user: Usuario
    output = {
        'id': current_user.get_id(),
        'username': current_user.username,
        'email': current_user.email,
        'created_on': current_user.created_on,
        'last_updated_on': current_user.last_updated_on,
        'is_admin': current_user.is_admin,
        'is_verified': current_user.is_verified
    }
    return jsonify(output), 200

<<<<<<< HEAD
@bp.route('/update', methods=['POST'])
@cross_origin()
@token_required
def update(current_user):

    username = request.json["username"]
    password = request.json["password"]
    email = request.json["email"]
=======
@bp.route('/update', methods=['PUT'])
@cross_origin()
@token_required
def update(current_user):
    try:
        username = request.json["username"]
        password = request.json["password"]
        email = request.json["email"]
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403
>>>>>>> develop

    # Obtengo el id de usuario del token
    current_user: Usuario
    id_usuario = current_user.get_id()

    # checking for existing user
    usuario = Usuario.query.filter_by(id=id_usuario).first()

    if not usuario:
        return jsonify({
            'message': "Usuario no encontrado"
        }), 404
    else:
        # ---------- INICIO DE VALIDACIONES ---------------------
<<<<<<< HEAD
        if not username or not password or not email:
            return jsonify({
                'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
            }), 403
        if len(username) > usuario.get_username_characters_limit() or len(email) > usuario.get_email_characters_limit(): # 'superan los caracteres maximos permitidos'
            return jsonify({
                'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos',
                'username_max_characters': f"{usuario.get_username_characters_limit()}",
                'email_max_characters': f"{usuario.get_email_characters_limit()}"
=======
        if len(username) > usuario.username_char_limit or len(email) > usuario.email_char_limit: # 'superan los caracteres maximos permitidos'
            return jsonify({
                'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos',
                'username_max_characters': f"{usuario.username_char_limit}",
                'email_max_characters': f"{usuario.email_char_limit}"
>>>>>>> develop
            }), 403
        if not validar_email(email):
            return jsonify({
                'message': 'Email invalido'
            }), 403
<<<<<<< HEAD
        if usuario.query.filter_by(username=username).first():
=======
        if usuario.query.filter_by(username=username).first() and not current_user.username:
>>>>>>> develop
            return jsonify({
                'message': "Nombre de usuario ya existente"
            }), 403

        # ---------- FIN DE VALIDACIONES ---------------------

        username = request.json["username"]
        password = request.json["password"]
        email = request.json["email"]

        usuario.username = username
        usuario.password = generate_password_hash(password)
        if cfg.EMAIL_VERIFICATION and usuario.email != email:
            usuario.email = email
            usuario.is_verified = False # Debe validar de nuevo el email para usar uno nuevo
        elif not cfg.EMAIL_VERIFICATION:
            usuario.email = email
        # Agrego el usuario en la base de datos
        usuario.update()
<<<<<<< HEAD
        return jsonify({
            'message': 'Usuario actualizado correctamente'  # 'Usuario creado exitosamente en la base de datos'
        }), 200
=======
        if usuario.is_verified:
            return jsonify({
                'message': 'Usuario actualizado correctamente'  # 'Usuario creado exitosamente en la base de datos'
            }), 200
        else:
            return jsonify({
                'message': 'Usuario actualizado correctamente. Debe verificar su email'  # 'Usuario creado exitosamente en la base de datos pero debe verificar email
            }), 200
>>>>>>> develop


@bp.route('/delete', methods=['DELETE'])
@cross_origin()
@token_required
def delete(current_user):

    # Obtengo el id de usuario del token
    current_user: Usuario
    id_usuario = current_user.get_id()

    ingresos = Ingreso.query.filter_by(id_usuario=id_usuario).all()
    for ingreso in ingresos:
        ingreso.delete()

    gastos = Gasto.query.filter_by(id_usuario=id_usuario).all()
    for gasto in gastos:
        gasto.delete()

    current_user.delete()
    return jsonify({
        'message': 'Usuario eliminado exitosamente'
    }), 200


