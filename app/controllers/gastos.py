import jwt
from flask_cors import cross_origin

from app import token_required
from flask import Blueprint, jsonify, request
from sqlalchemy import and_

from app.models.gastos import Gasto
from app.models.usuarios import Usuario

bp = Blueprint('gastos', __name__, url_prefix='/gastos')


# User Database Route
# this route sends back list of users
@bp.route('/list', methods=['GET'])
@cross_origin()
@token_required
def get_all(current_user):
    # Me fijo si el usuario logueado (token) es admin
    current_user: Usuario
    if current_user.is_admin: # Si es admin, traigo los gastos de todos los usuarios
        gastos = Gasto.query.all()
    else: # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gastos = Gasto.query.filter_by(id_usuario=current_user.get_id()).all()
    # converting the query objects
    # to list of jsons
    output = []
    for gasto in gastos:
        # appending the user data json
        # to the response list
        output.append({
            'id': gasto.id,
            'monto': gasto.monto,
            'descripcion': gasto.descripcion,
            'fecha': gasto.fecha,
            'tipo': gasto.tipo,
            'id_usuario': gasto.id_usuario
        })

    return jsonify({'gastos': output}), 200


@bp.route('/get_all_by_monto', methods=['GET'])
@cross_origin()
@token_required
def get_all_by_monto(current_user):
    # Me fijo si el usuario logueado (token) es admin
    try:
        monto = request.json['value']
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        gastos = Gasto.query.filter_by(monto=monto).all()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gastos = Gasto.query.filter_by(id_usuario=current_user.get_id(), monto=monto).all()
    # convierto la lista obtenida a coleccion de json
    output = []
    for gasto in gastos:
        output.append({
            'id': gasto.id,
            'monto': gasto.monto,
            'descripcion': gasto.descripcion,
            'fecha': gasto.fecha,
            'tipo': gasto.tipo,
            'id_usuario': gasto.id_usuario
        })
    return jsonify({'gastos': output}), 200



@bp.route('/get_first_by_monto', methods=['GET'])
@cross_origin()
@token_required
def get_first_by_monto(current_user):
    # Me fijo si el usuario logueado (token) es admin
    try:
        monto = request.json['value']
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        gasto = Gasto.query.filter_by(monto=monto).first()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gasto = Gasto.query.filter_by(id_usuario=current_user.get_id(), monto=monto).first()
    # Convierto el gasto traido a json
    output = {
        'id': gasto.id,
        'monto': gasto.monto,
        'descripcion': gasto.descripcion,
        'fecha': gasto.fecha,
        'tipo': gasto.tipo,
        'id_usuario': gasto.id_usuario
    }
    return jsonify({'gasto': output}), 200


@bp.route('/get_all_between_fechas', methods=['GET'])
@cross_origin()
@token_required
def get_all_between_fechas(current_user):
    # Me fijo si el usuario logueado (token) es admin
    try:
        fecha_inicio = request.json['fecha_inicio']
        fecha_fin = request.json['fecha_fin']
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los elementos de todos los usuarios
        gastos = Gasto.query.filter(
            Gasto.fecha >= fecha_inicio, Gasto.fecha <= fecha_fin
        ).all()
    else:  # Si NO es admin, traigo solo los elementos que le pertenecen al usuario logueado
        gastos = Gasto.query.filter(
            Gasto.id_usuario == current_user.get_id(),
            and_(Gasto.fecha >= fecha_inicio, Gasto.fecha <= fecha_fin)
        ).all()
    # convierto la lista obtenida a coleccion de json
    output = []
    for gasto in gastos:
        output.append({
            'id': gasto.id,
            'monto': gasto.monto,
            'descripcion': gasto.descripcion,
            'fecha': gasto.fecha,
            'tipo': gasto.tipo,
            'id_usuario': gasto.id_usuario
        })
    return jsonify({'gastos': output}), 200


@bp.route('/get_all_by_tipo', methods=['GET'])
@cross_origin()
@token_required
def get_all_by_tipo(current_user):
    # Me fijo si el usuario logueado (token) es admin
    try:
        tipo = request.json['value']
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        gastos = Gasto.query.filter_by(tipo=tipo).all()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gastos = Gasto.query.filter_by(id_usuario=current_user.get_id(), tipo=tipo).all()
    # convierto la lista obtenida a coleccion de json
    output = []
    for gasto in gastos:
        output.append({
            'id': gasto.id,
            'monto': gasto.monto,
            'descripcion': gasto.descripcion,
            'fecha': gasto.fecha,
            'tipo': gasto.tipo,
            'id_usuario': gasto.id_usuario
        })
    return jsonify({'gastos': output}), 200


@bp.route('/get_first_by_tipo', methods=['GET'])
@cross_origin()
@token_required
def get_first_gasto_by_tipo(current_user):
    # Me fijo si el usuario logueado (token) es admin
    try:
        tipo = request.json['value']
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403
    current_user: Usuario
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        gasto = Gasto.query.filter_by(tipo=tipo).first()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gasto = Gasto.query.filter_by(id_usuario=current_user.get_id(), tipo=tipo).first()
    # Convierto el gasto traido a json
    output = {
        'id': gasto.id,
        'monto': gasto.monto,
        'descripcion': gasto.descripcion,
        'fecha': gasto.fecha,
        'tipo': gasto.tipo,
        'id_usuario': gasto.id_usuario
    }
    return jsonify({'gasto': output}), 200

<<<<<<< HEAD
@bp.route('/add', methods=['PUT'])
=======
@bp.route('/add', methods=['POST'])
>>>>>>> develop
@cross_origin()
@token_required
def add(current_user):

    # Obtengo los datos necesarios para crear el elemento desde json enviado en el body
<<<<<<< HEAD
    descripcion = request.json["descripcion"]
    monto = request.json["monto"]
    tipo = request.json["tipo"]
=======
    try:
        descripcion = request.json["descripcion"]
        monto = request.json["monto"]
        tipo = request.json["tipo"]
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403
>>>>>>> develop
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
    gasto = Gasto(id_usuario, descripcion, monto, tipo, fecha)

<<<<<<< HEAD
    if not monto or not tipo:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403
    if len(descripcion) > gasto.get_descripcion_characters_limit() or len(tipo) > gasto.get_tipo_characters_limit(): # 'superan los caracteres maximos permitidos'
=======
    if len(descripcion) > gasto.descripcion_char_limit or len(tipo) > gasto.tipo_char_limit: # 'superan los caracteres maximos permitidos'
        return jsonify({
            'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos.',
            'descripcion_max_characters': f"{gasto.descripcion_char_limit}",
            'tipo_max_characters': f"{gasto.tipo_char_limit}"
        }), 403

    # ---------- FIN DE VALIDACIONES ---------------------

    # Cargo el elemento en la base de datos
    Gasto.create(gasto)

    return jsonify({
        'message': 'Gasto registrado exitosamente'
    }), 201

@bp.route('/update', methods=['PUT'])
@cross_origin()
@token_required
def update(current_user):

    # Obtengo los datos necesarios para actualizar el elemento desde json enviado en el body
    try:
        id_gasto = request.json["id"]
        descripcion = request.json["descripcion"]
        monto = request.json["monto"]
        tipo = request.json["tipo"]
    except KeyError:
>>>>>>> develop
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403

    # ---------- FIN DE VALIDACIONES ---------------------

    # Cargo el elemento en la base de datos
    Gasto.create(gasto)

    return jsonify({
        'message': 'Gasto registrado exitosamente'
    }), 201

@bp.route('/update', methods=['POST'])
@cross_origin()
@token_required
def update(current_user):

    # Obtengo los datos necesarios para actualizar el elemento desde json enviado en el body
    id_gasto = request.json["id"]
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
                'message': 'monto negativo'  # 'No se permite crear gastos con monto negativo'
            }), 403
    except ValueError:
        return jsonify({
            'message': "Valor invalido en 'monto'"  # 'No se permite crear gastos con monto invalido'
        }), 403

    # Busco el elemento
    gasto = Gasto.query.filter_by(id=id_gasto).first()

    if not (gasto and (current_user.is_admin or gasto.id_usuario != id_usuario)):
        return jsonify({
            'message': 'No se ha encontrado el elemento'
        }), 404

<<<<<<< HEAD
    if not monto or not tipo:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403
    if len(descripcion) > gasto.get_descripcion_characters_limit() or len(tipo) > gasto.get_tipo_characters_limit(): # 'superan los caracteres maximos permitidos'
        return jsonify({
            'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos.',
            'descripcion_max_characters': f"{gasto.get_descripcion_characters_limit()}",
            'tipo_max_characters': f"{gasto.get_tipo_characters_limit()}"
=======
    if len(descripcion) > gasto.descripcion_char_limit or len(tipo) > gasto.tipo_char_limit: # 'superan los caracteres maximos permitidos'
        return jsonify({
            'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos.',
            'descripcion_max_characters': f"{gasto.descripcion_char_limit}",
            'tipo_max_characters': f"{gasto.tipo_char_limit}"
>>>>>>> develop
        }), 403

    # ---------- FIN DE VALIDACIONES ---------------------

    # Actualizo los valores del elemento
    gasto.descripcion = descripcion
    gasto.monto = monto
    gasto.tipo = tipo
<<<<<<< HEAD
    gasto.fecha = fecha
=======
    if fecha:
        gasto.fecha = fecha
>>>>>>> develop

    # Actualizo el elemento en la base de datos
    gasto.update()

    return jsonify({
        'message': 'Gasto actualizado exitosamente'
    }), 200

@bp.route('/delete', methods=['DELETE'])
@cross_origin()
@token_required
def delete(current_user):
    # Obtengo los datos necesarios para eliminar el elemento desde json enviado en el body
<<<<<<< HEAD
    id_gasto = request.json["id"]

=======
    try:
        id_gasto = request.json["id"]
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 403
>>>>>>> develop
    # Obtengo el id de usuario del token
    current_user: Usuario
    id_usuario = current_user.get_id()

    gasto = Gasto.query.filter_by(id=id_gasto).first()

    if not (gasto and (current_user.is_admin or gasto.id_usuario != id_usuario)):
        return jsonify({
            'message': 'No se ha encontrado el elemento'
        }), 404

    gasto.delete()
    return jsonify({
        'message': 'Elemento eliminado exitosamente'
    }), 200