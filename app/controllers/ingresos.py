import jwt
from flask_cors import cross_origin

from app import token_required
from flask import Blueprint, jsonify, request
from sqlalchemy import and_

from app.models.ingresos import Ingreso
from app.models.usuarios import Usuario

bp = Blueprint('ingresos', __name__, url_prefix='/ingresos')


# User Database Route
# this route sends back list of users
@bp.route('/list', methods=['GET'])
@cross_origin()
@token_required
def get_all(current_user):
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
            'id': ingreso.id,
            'monto': ingreso.monto,
            'descripcion': ingreso.descripcion,
            'fecha': ingreso.fecha,
            'tipo': ingreso.tipo,
            'id_usuario': ingreso.id_usuario
        })

    return jsonify({'ingresos': output}), 200


@bp.route('/get_all_by_monto', methods=['GET'])
@cross_origin()
@token_required
def get_all_by_monto(current_user):
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
            'id': ingreso.id,
            'monto': ingreso.monto,
            'descripcion': ingreso.descripcion,
            'fecha': ingreso.fecha,
            'tipo': ingreso.tipo,
            'id_usuario': ingreso.id_usuario
        })
    return jsonify({'ingresos': output}), 200



@bp.route('/get_first_by_monto', methods=['GET'])
@cross_origin()
@token_required
def get_first_by_monto(current_user):
    # Me fijo si el usuario logueado (token) es admin
    monto = request.json['value']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los ingresos de todos los usuarios
        ingreso = Ingreso.query.filter_by(monto=monto).first()
    else:  # Si NO es admin, traigo solo los ingresos que le pertenecen al usuario logueado
        ingreso = Ingreso.query.filter_by(id_usuario=current_user.get_id(), monto=monto).first()
    # Convierto el ingreso traido a json
    output = {
        'id': ingreso.id,
        'monto': ingreso.monto,
        'descripcion': ingreso.descripcion,
        'fecha': ingreso.fecha,
        'tipo': ingreso.tipo,
        'id_usuario': ingreso.id_usuario
    }
    return jsonify({'ingreso': output}), 200


@bp.route('/get_all_between_fechas', methods=['GET'])
@cross_origin()
@token_required
def get_all_between_fechas(current_user):
    # Me fijo si el usuario logueado (token) es admin
    fecha_inicio = request.json['fecha_inicio']
    fecha_fin = request.json['fecha_fin']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los ingresos de todos los usuarios
        ingresos = Ingreso.query.filter(
            Ingreso.fecha >= fecha_inicio, Ingreso.fecha <= fecha_fin
        ).all()
    else:  # Si NO es admin, traigo solo los ingresos que le pertenecen al usuario logueado
        ingresos = Ingreso.query.filter(
            Ingreso.id_usuario == current_user.get_id(),
            and_(Ingreso.fecha >= fecha_inicio, Ingreso.fecha <= fecha_fin)
        ).all()
    # convierto la lista obtenida a coleccion de json
    output = []
    for ingreso in ingresos:
        output.append({
            'id': ingreso.id,
            'monto': ingreso.monto,
            'descripcion': ingreso.descripcion,
            'fecha': ingreso.fecha,
            'tipo': ingreso.tipo,
            'id_usuario': ingreso.id_usuario
        })
    return jsonify({'ingresos': output}), 200


@bp.route('/get_all_by_tipo', methods=['GET'])
@cross_origin()
@token_required
def get_all_by_tipo(current_user):
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
            'id': ingreso.id,
            'monto': ingreso.monto,
            'descripcion': ingreso.descripcion,
            'fecha': ingreso.fecha,
            'tipo': ingreso.tipo,
            'id_usuario': ingreso.id_usuario
        })
    return jsonify({'ingresos': output}), 200


@bp.route('/get_first_by_tipo', methods=['GET'])
@cross_origin()
@token_required
def get_first_by_tipo(current_user):
    # Me fijo si el usuario logueado (token) es admin
    tipo = request.json['value']
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los ingresos de todos los usuarios
        ingreso = Ingreso.query.filter_by(tipo=tipo).first()
    else:  # Si NO es admin, traigo solo los ingresos que le pertenecen al usuario logueado
        ingreso = Ingreso.query.filter_by(id_usuario=current_user.get_id(), tipo=tipo).first()
    # Convierto el ingreso traido a json
    output = {
        'id': ingreso.id,
        'monto': ingreso.monto,
        'descripcion': ingreso.descripcion,
        'fecha': ingreso.fecha,
        'tipo': ingreso.tipo,
        'id_usuario': ingreso.id_usuario
    }
    return jsonify({'ingreso': output}), 200


@bp.route('/add', methods=['PUT'])
@cross_origin()
@token_required
def add(current_user):

    # Obtengo los datos necesarios para crear el elemento desde json enviado en el body
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

    # ---------- INICIO DE VALIDACIONES ---------------------

    try:
        if float(monto) < 0.0:
            return jsonify({
                'message': 'monto negativo'  # 'No se permite crear elementos con monto negativo'
            }), 403
    except ValueError:
        return jsonify({
            'message': "Valor invalido en 'monto'"  # 'No se permite crear elementos con monto invalido'
        }), 403

    # Creo el elemento
    ingreso = Ingreso(id_usuario, descripcion, monto, tipo, fecha)

    if not monto or not tipo:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403
    if len(descripcion) > ingreso.get_descripcion_characters_limit() or len(tipo) > ingreso.get_tipo_characters_limit(): # 'superan los caracteres maximos permitidos'
        return jsonify({
            'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos.',
            'descripcion_max_characters': f"{ingreso.get_descripcion_characters_limit()}",
            'tipo_max_characters': f"{ingreso.get_tipo_characters_limit()}"
        }), 403

    # ---------- FIN DE VALIDACIONES ---------------------

    # Cargo el elemento en la base de datos
    Ingreso.create(ingreso)

    return jsonify({
        'message': 'Ingreso registrado exitosamente'
    }), 201

@bp.route('/update', methods=['POST'])
@cross_origin()
@token_required
def update(current_user):

    # Obtengo los datos necesarios para actualizar el elemento desde json enviado en el body
    id_ingreso = request.json["id"]
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

    # ---------- INICIO DE VALIDACIONES ---------------------

    try:
        if float(monto) < 0.0:
            return jsonify({
                'message': 'monto negativo'  # 'No se permite crear ingresos con monto negativo'
            }), 403
    except ValueError:
        return jsonify({
            'message': "Valor invalido en 'monto'"  # 'No se permite crear ingresos con monto invalido'
        }), 403

    # Busco el elemento
    ingreso = Ingreso.query.filter_by(id=id_ingreso).first()

    if not (ingreso and (current_user.is_admin or ingreso.id_usuario != id_usuario)):
        return jsonify({
            'message': 'No se ha encontrado el elemento'
        }), 404

    if not monto or not tipo:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403
    if len(descripcion) > ingreso.get_descripcion_characters_limit() or len(tipo) > ingreso.get_tipo_characters_limit(): # 'superan los caracteres maximos permitidos'
        return jsonify({
            'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos.',
            'descripcion_max_characters': f"{ingreso.get_descripcion_characters_limit()}",
            'tipo_max_characters': f"{ingreso.get_tipo_characters_limit()}"
        }), 403

    # ---------- FIN DE VALIDACIONES ---------------------

    # Actualizo los valores del elemento
    ingreso.descripcion = descripcion
    ingreso.monto = monto
    ingreso.tipo = tipo
    ingreso.fecha = fecha

    # Actualizo el elemento en la base de datos
    ingreso.update()

    return jsonify({
        'message': 'Ingreso actualizado exitosamente'
    }), 200

@bp.route('/delete', methods=['DELETE'])
@cross_origin()
@token_required
def delete(current_user):
    # Obtengo los datos necesarios para eliminar el elemento desde json enviado en el body
    id_ingreso = request.json["id"]

    # Obtengo el id de usuario del token
    current_user: Usuario
    id_usuario = current_user.get_id()

    ingreso = Ingreso.query.filter_by(id=id_ingreso).first()

    if not (ingreso and (current_user.is_admin or ingreso.id_usuario != id_usuario)):
        return jsonify({
            'message': 'No se ha encontrado el elemento'
        }), 404

    ingreso.delete()
    return jsonify({
        'message': 'Elemento eliminado exitosamente'
    }), 200
