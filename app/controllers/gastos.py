import jwt

from app import token_required
from flask import Blueprint, jsonify, request

from app.models.gastos import Gasto
from app.models.usuarios import Usuario

bp = Blueprint('gastos', __name__, url_prefix='/gastos')


# User Database Route
# this route sends back list of users
@bp.route('/list', methods=['GET'])
@token_required
def get_all_gastos(current_user):
    # Me fijo si el usuario logueado (token) es admin
    current_user: Usuario
    if current_user.is_admin: # Si es admin, traigo los gastos de todos los usuarios
        gastos = Gasto.query.all()
    else: # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gastos = Gasto.query.filter_by(id_usuario=Usuario.get_id()).all()
    # converting the query objects
    # to list of jsons
    output = []
    for gasto in gastos:
        # appending the user data json
        # to the response list
        output.append({
            'monto': gasto.monto,
            'descripcion': gasto.descripcion,
            'fecha': gasto.fecha,
            'tipo': gasto.tipo,
            'id_usuario': gasto.id_usuario
        })

    return jsonify({'gastos': output})


# add gasto route
@bp.route('/add', methods=['POST'])
@token_required
def add_gasto(current_user):

    # Obtengo los datos necesarios para crear el gasto desde json enviado en el body
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

    # Creo el gasto
    gasto = Gasto(id_usuario, descripcion, monto, tipo, fecha)
    Gasto.create(gasto)

    return jsonify({
        'message': 'Gasto registrado exitosamente'
    }), 200



@bp.route('/get_all_by_monto', methods=['GET'])
@token_required
def get_all_gastos_by_monto(current_user):
    # Me fijo si el usuario logueado (token) es admin
    monto = request.json['value']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        gastos = Gasto.query.filter_by(monto=monto).all()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gastos = Gasto.query.filter_by(id_usuario=Usuario.get_id(), monto=monto).all()
    # convierto la lista obtenida a coleccion de json
    output = []
    for gasto in gastos:
        output.append({
            'monto': gasto.monto,
            'descripcion': gasto.descripcion,
            'fecha': gasto.fecha,
            'tipo': gasto.tipo,
            'id_usuario': gasto.id_usuario
        })
    return jsonify({'gastos': output})



@bp.route('/get_first_by_monto', methods=['GET'])
@token_required
def get_first_gasto_by_monto(current_user):
    # Me fijo si el usuario logueado (token) es admin
    monto = request.json['value']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        gasto = Gasto.query.filter_by(monto=monto).first()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gasto = Gasto.query.filter_by(id_usuario=Usuario.get_id(), monto=monto).first()
    # Convierto el gasto traido a json
    output = {
        'monto': gasto.monto,
        'descripcion': gasto.descripcion,
        'fecha': gasto.fecha,
        'tipo': gasto.tipo,
        'id_usuario': gasto.id_usuario
    }
    return jsonify({'gasto': output})


@bp.route('/get_all_between_fechas', methods=['GET'])
@token_required
def get_all_gastos_between_fechas(current_user):
    # Me fijo si el usuario logueado (token) es admin
    fecha_inicio = request.json['fecha_inicio']
    fecha_fin = request.json['fecha_fin']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        gastos = Gasto.query.filter(
            Gasto.fecha.between(fecha_inicio, fecha_fin)
        ).all()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gastos = Gasto.query.filter(
            Gasto.id_usuario == Usuario.get_id(),
            Gasto.fecha.between(fecha_inicio, fecha_fin)
        ).all()
    # convierto la lista obtenida a coleccion de json
    output = []
    for gasto in gastos:
        output.append({
            'monto': gasto.monto,
            'descripcion': gasto.descripcion,
            'fecha': gasto.fecha,
            'tipo': gasto.tipo,
            'id_usuario': gasto.id_usuario
        })
    return jsonify({'gastos': output})


@bp.route('/get_all_by_tipo', methods=['GET'])
@token_required
def get_all_gastos_by_tipo(current_user):
    # Me fijo si el usuario logueado (token) es admin
    tipo = request.json['value']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        gastos = Gasto.query.filter_by(tipo=tipo).all()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gastos = Gasto.query.filter_by(id_usuario=Usuario.get_id(), tipo=tipo).all()
    # convierto la lista obtenida a coleccion de json
    output = []
    for gasto in gastos:
        output.append({
            'monto': gasto.monto,
            'descripcion': gasto.descripcion,
            'fecha': gasto.fecha,
            'tipo': gasto.tipo,
            'id_usuario': gasto.id_usuario
        })
    return jsonify({'gastos': output})


@bp.route('/get_first_by_tipo', methods=['GET'])
@token_required
def get_first_gasto_by_tipo(current_user):
    # Me fijo si el usuario logueado (token) es admin
    tipo = request.json['value']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        gasto = Gasto.query.filter_by(tipo=tipo).first()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gasto = Gasto.query.filter_by(id_usuario=Usuario.get_id(), tipo=tipo).first()
    # Convierto el gasto traido a json
    output = {
        'monto': gasto.monto,
        'descripcion': gasto.descripcion,
        'fecha': gasto.fecha,
        'tipo': gasto.tipo,
        'id_usuario': gasto.id_usuario
    }
    return jsonify({'gasto': output})