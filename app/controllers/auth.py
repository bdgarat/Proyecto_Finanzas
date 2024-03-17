from flask import Blueprint, request, jsonify
import jwt
import datetime
from app import app

from werkzeug.security import check_password_hash, generate_password_hash

from app.models.usuarios import Usuario

bp = Blueprint('auth', __name__, url_prefix='/auth')
# route for logging user in
@bp.route('/login', methods=['POST'])
def user_login():
    # creates dictionary of form data
    username = request.json["username"]
    password = request.json["password"]

    if not username or not password:
        # returns 401 if any email or / and password is missing
        return jsonify({
            'message': 'Username o password invalidos1'
        }), 401 # Siempre se envia la misma respuesta ante 401 por motivos de ciberseguridad

    usuario = Usuario.query.filter_by(username=username).first()

    if not usuario:
        # returns 401 if user does not exist
        return jsonify({
            'message': 'Username o password invalidos2' # 'Usuario no encontrado'
        }), 401 # Siempre se envia la misma respuesta ante 401 por motivos de ciberseguridad

    if check_password_hash(usuario.password_hash, password):
        # generates the JWT Token
        token = jwt.encode({
            'id': usuario.id,
            'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'])

        return jsonify({'token': token}), 201
    # returns 403 if password is wrong
    return jsonify({
            'message': 'Username o password invalidos3' # 'Password incorrecta'
        }), 401 # Siempre se envia la misma respuesta ante 401 por motivos de ciberseguridad


# signup route
@bp.route('/signup', methods=['POST'])
def user_signup():

    username = request.json["username"]
    sigla = request.json["sigla"]
    tipo = request.json["tipo"]
    password = request.json["password"]
    email = request.json["email"]

    # checking for existing user
    usuario = Usuario.query.filter_by(username=username).first()

    if not usuario:
        # database ORM object
        usuario = Usuario(username, sigla, tipo, email, generate_password_hash(password))
        Usuario.create(usuario)

        return jsonify({
            'message': 'Usuario registrado correctamente'  # 'Usuario no encontrado'
        }), 201
    else:
        # returns 202 if user already exists
        return jsonify({
            'message': 'Usuario existente'  # 'Usuario ya creado'
        }), 202