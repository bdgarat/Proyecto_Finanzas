from flask import Blueprint, request, jsonify
import jwt
import datetime

from flask_cors import cross_origin

from app import app

from werkzeug.security import check_password_hash, generate_password_hash

from app.models.usuarios import Usuario
from app.utils.email_validation import validar_email

bp = Blueprint('auth', __name__, url_prefix='/auth')
# route for logging user in
@bp.route('/login', methods=['POST'])
@cross_origin()
def user_login():
    # creates dictionary of form data
    username = request.json["username"]
    password = request.json["password"]

    if not username or not password:
        # returns 401 if any email or / and password is missing
        return jsonify({
            'message': 'Username o password invalidos'
        }), 401 # Siempre se envia la misma respuesta ante 401 por motivos de ciberseguridad

    usuario = Usuario.query.filter_by(username=username).first()

    if not usuario:
        # returns 401 if user does not exist
        return jsonify({
            'message': 'Username o password invalidos' # 'Usuario no encontrado'
        }), 401 # Siempre se envia la misma respuesta ante 401 por motivos de ciberseguridad

    if check_password_hash(usuario.password_hash, password):
        # generates the JWT Token
        token = jwt.encode({
            'id': usuario.id,
            'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=120)
        }, app.config['SECRET_KEY'])

        return jsonify({'token': token}), 200
    # returns 403 if password is wrong
    return jsonify({
            'message': 'Username o password invalidos' # 'Password incorrecta'
        }), 401 # Siempre se envia la misma respuesta ante 401 por motivos de ciberseguridad


# signup route
@bp.route('/signup', methods=['POST'])
@cross_origin()
def user_signup():

    username = request.json["username"]
    saldo_actual = request.json["saldo_actual"]
    password = request.json["password"]
    email = request.json["email"]

    # checking for existing user
    usuario = Usuario.query.filter_by(username=username).first()

    if not usuario:
        # database ORM object
        usuario = Usuario(username = username, saldo_actual = saldo_actual, password_hash = generate_password_hash(password), email = email)

        # ---------- INICIO DE VALIDACIONES ---------------------
        if not username or not saldo_actual or not password or not email:
            return jsonify({
                'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
            }), 403
        if len(username) > usuario.get_username_characters_limit() or len(email) > usuario.get_email_characters_limit(): # 'superan los caracteres maximos permitidos'
            return jsonify({
                'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos',
                'username_max_characters': f"{usuario.get_username_characters_limit()}",
                'email_max_characters': f"{usuario.get_email_characters_limit()}"
            }), 403
        if not validar_email(email):
            return jsonify({
                'message': 'Email invalido'  # 'email no cumple con sintaxis'
            }), 403
        try:
            if float(saldo_actual) < 0.0:
                return jsonify({
                    'message': 'Saldo negativo'  # 'No se permite crear cuentas con saldo negativo'
                }), 403
        except ValueError:
            return jsonify({
                'message': "Valor invalido en 'sueldo_actual'"  # 'No se permite crear cuentas con saldo invalido'
            }), 403

        # ---------- FIN DE VALIDACIONES ---------------------

        # Agrego el usuario en la base de datos
        Usuario.create(usuario)
        return jsonify({
            'message': 'Usuario registrado correctamente'  # 'Usuario creado exitosamente en la base de datos'
        }), 201
    else:
        # returns 202 if user already exists
        return jsonify({
            'message': 'Usuario existente'  # 'Usuario ya existe en la base de datos'
        }), 202