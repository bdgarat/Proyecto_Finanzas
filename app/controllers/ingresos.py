import jwt

from app import token_required
from flask import Blueprint, jsonify, request

from app.models.ingresos import Ingreso
from app.models.usuarios import Usuario

bp = Blueprint('ingresos', __name__, url_prefix='/ingresos')


# User Database Route
# this route sends back list of users
@bp.route('/list', methods=['GET'])
@token_required
def get_all_ingresos(current_user):
    # Me fijo si el usuario logueado (token) es admin
    current_user: Usuario
    if current_user.is_admin: # Si es admin, traigo los ingresos de todos los usuarios
        ingresos = Ingreso.query.all()
    else: # Si NO es admin, traigo solo los ingresos que le pertenecen al usuario logueado
        ingresos = Ingreso.query.filter_by(id_usuario=current_user.get_id()).all()
    # converting the query objects
    # to list of jsons
    output = []
    for ingreso in ingresos:
        # appending the user data json
        # to the response list
        output.append({
            'monto': ingreso.monto,
            'descripcion': ingreso.descripcion,
            'fecha': ingreso.fecha,
            'tipo': ingreso.tipo,
            'id_usuario': ingreso.id_usuario
        })

    return jsonify({'ingresos': output})


# add ingreso route
@bp.route('/add', methods=['POST'])
@token_required
def add_ingreso(current_user):

    # Obtengo los datos necesarios para crear el ingreso desde json enviado en el body
    descripcion = request.json["descripcion"]
    monto = request.json["monto"]
    tipo = request.json["tipo"]
    try:
        fecha = request.json["fecha"]
    except KeyError:
        fecha = None

    # Obtengo el id de usuario del token
    current_user: Usuario
    id_usuario = current_user.get_id()

    # Creo el ingreso
    ingreso = Ingreso(id_usuario, descripcion, monto, tipo, fecha)
    Ingreso.create(ingreso)

    return jsonify({
        'message': 'Ingreso registrado exitosamente'
    }), 200



@bp.route('/get_all_by_monto', methods=['GET'])
@token_required
def get_all_ingresos_by_monto(current_user):
    # Me fijo si el usuario logueado (token) es admin
    monto = request.json['value']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los ingresos de todos los usuarios
        ingresos = Ingreso.query.filter_by(monto=monto).all()
    else:  # Si NO es admin, traigo solo los ingresos que le pertenecen al usuario logueado
        ingresos = Ingreso.query.filter_by(id_usuario=current_user.get_id(), monto=monto).all()
    # convierto la lista obtenida a coleccion de json
    output = []
    for ingreso in ingresos:
        output.append({
            'monto': ingreso.monto,
            'descripcion': ingreso.descripcion,
            'fecha': ingreso.fecha,
            'tipo': ingreso.tipo,
            'id_usuario': ingreso.id_usuario
        })
    return jsonify({'ingresos': output})



@bp.route('/get_first_by_monto', methods=['GET'])
@token_required
def get_first_ingreso_by_monto(current_user):
    # Me fijo si el usuario logueado (token) es admin
    monto = request.json['value']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los ingresos de todos los usuarios
        ingreso = Ingreso.query.filter_by(monto=monto).first()
    else:  # Si NO es admin, traigo solo los ingresos que le pertenecen al usuario logueado
        ingreso = Ingreso.query.filter_by(id_usuario=current_user.get_id(), monto=monto).first()
    # Convierto el ingreso traido a json
    output = {
        'monto': ingreso.monto,
        'descripcion': ingreso.descripcion,
        'fecha': ingreso.fecha,
        'tipo': ingreso.tipo,
        'id_usuario': ingreso.id_usuario
    }
    return jsonify({'ingreso': output})


@bp.route('/get_all_between_fechas', methods=['GET'])
@token_required
def get_all_ingresos_between_fechas(current_user):
    # Me fijo si el usuario logueado (token) es admin
    fecha_inicio = request.json['fecha_inicio']
    fecha_fin = request.json['fecha_fin']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los ingresos de todos los usuarios
        ingresos = Ingreso.query.filter(
            Ingreso.fecha.between(fecha_inicio, fecha_fin)
        ).all()
    else:  # Si NO es admin, traigo solo los ingresos que le pertenecen al usuario logueado
        ingresos = Ingreso.query.filter(
            Ingreso.id_usuario == Usuario.get_id(),
            Ingreso.fecha.between(fecha_inicio, fecha_fin)
        ).all()
    # convierto la lista obtenida a coleccion de json
    output = []
    for ingreso in ingresos:
        output.append({
            'monto': ingreso.monto,
            'descripcion': ingreso.descripcion,
            'fecha': ingreso.fecha,
            'tipo': ingreso.tipo,
            'id_usuario': ingreso.id_usuario
        })
    return jsonify({'ingresos': output})


@bp.route('/get_all_by_tipo', methods=['GET'])
@token_required
def get_all_ingresos_by_tipo(current_user):
    # Me fijo si el usuario logueado (token) es admin
    tipo = request.json['value']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los ingresos de todos los usuarios
        ingresos = Ingreso.query.filter_by(tipo=tipo).all()
    else:  # Si NO es admin, traigo solo los ingresos que le pertenecen al usuario logueado
        ingresos = Ingreso.query.filter_by(id_usuario=current_user.get_id(), tipo=tipo).all()
    # convierto la lista obtenida a coleccion de json
    output = []
    for ingreso in ingresos:
        output.append({
            'monto': ingreso.monto,
            'descripcion': ingreso.descripcion,
            'fecha': ingreso.fecha,
            'tipo': ingreso.tipo,
            'id_usuario': ingreso.id_usuario
        })
    return jsonify({'ingresos': output})


@bp.route('/get_first_by_tipo', methods=['GET'])
@token_required
def get_first_ingreso_by_tipo(current_user):
    # Me fijo si el usuario logueado (token) es admin
    tipo = request.json['value']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los ingresos de todos los usuarios
        ingreso = Ingreso.query.filter_by(tipo=tipo).first()
    else:  # Si NO es admin, traigo solo los ingresos que le pertenecen al usuario logueado
        ingreso = Ingreso.query.filter_by(id_usuario=current_user.get_id(), tipo=tipo).first()
    # Convierto el ingreso traido a json
    output = {
        'monto': ingreso.monto,
        'descripcion': ingreso.descripcion,
        'fecha': ingreso.fecha,
        'tipo': ingreso.tipo,
        'id_usuario': ingreso.id_usuario
    }
    return jsonify({'ingreso': output})