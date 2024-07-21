from flask import Blueprint, request, jsonify
import jwt
import datetime

from flask_cors import cross_origin

from app import app

from werkzeug.security import check_password_hash, generate_password_hash

from app.models.usuarios import Usuario
from app.utils.email_validation import validar_email

from app import config as cfg

bp = Blueprint('auth', __name__, url_prefix='/auth')
# route for logging user in
@bp.route('/login', methods=['POST'])
@cross_origin()
def user_login():
    """Realiza el login del usuario"""
    # creates dictionary of form data
    try:
        username = request.json["username"]
        password = request.json["password"]
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 401

    usuario = Usuario.query.filter_by(username=username).first()

    if not usuario:
        # returns 401 if user does not exist
        return jsonify({
            'message': 'Username o password invalidos' # 'Usuario no encontrado'
        }), 401 # Siempre se envia la misma respuesta ante 401 por motivos de ciberseguridad

    if not usuario.is_verified:
        return jsonify({
            'message': 'Usuario no validado'
        }), 403

    if check_password_hash(usuario.password_hash, password):
        # generates the JWT Token
        token = jwt.encode({
            'id': usuario.id,
            'exp': datetime.datetime.now() + datetime.timedelta(hours=120)
        }, app.config['SECRET_KEY'])

        usuario.last_login = datetime.datetime.now()
        usuario.update()

        return jsonify({'token': token}), 200

    # returns 403 if password is wrong
    return jsonify({
            'message': 'Username o password invalidos' # 'Password incorrecta'
        }), 401 # Siempre se envia la misma respuesta ante 401 por motivos de ciberseguridad


# signup route
@bp.route('/signup', methods=['POST'])
@cross_origin()
def user_signup():
    """Genera un nuevo usuario"""
    try:
        username = request.json["username"]
        password = request.json["password"]
        email = request.json["email"]
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403

    # checking for existing user
    usuario = Usuario.query.filter_by(username=username).first()

    if not usuario:
        # database ORM object
        verified_on_creation = not cfg.EMAIL_VERIFICATION # Si no se verifica email, se asume verificacion correcta
        usuario = Usuario(username = username, password_hash = generate_password_hash(password), email = email, is_verified=verified_on_creation)

        # ---------- INICIO DE VALIDACIONES ---------------------

        if len(username) > usuario.username_char_limit or len(email) > usuario.email_char_limit: # 'superan los caracteres maximos permitidos'
            return jsonify({
                'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos',
                'username_max_characters': f"{usuario.username_char_limit}",
                'email_max_characters': f"{usuario.email_char_limit}"
            }), 403
        if not validar_email(email):
            return jsonify({
                'message': 'Email invalido'  # 'email no cumple con sintaxis'
            }), 403

        # ---------- FIN DE VALIDACIONES ---------------------

        # Agrego el usuario en la base de datos
        Usuario.create(usuario)
        if not verified_on_creation:
            return jsonify({
                'message': 'Usuario registrado correctamente. Debe verificar el email para loguearse'
            }), 201
        else:
            return jsonify({
                'message': 'Usuario registrado correctamente'
            }), 201
    else:
        # returns 202 if user already exists
        return jsonify({
            'message': 'Usuario existente'  # 'Usuario ya existe en la base de datos'
        }), 202