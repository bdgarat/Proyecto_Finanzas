import datetime

from flask_cors import cross_origin

from app import token_required
from flask import Blueprint, jsonify, request, g
from sqlalchemy import and_

from app.models.gastos import Gasto
from app.models.usuarios import Usuario

from app.utils.paginated_query import paginated_query

bp = Blueprint('gastos', __name__, url_prefix='/gastos')


# User Database Route
# this route sends back list of users
@bp.route('/list', methods=['GET'])
@cross_origin()
@token_required
def get_all():
    """Devuelve un JSON con info de todos los gastos generados por un usuario"""
    page_number = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    current_user: Usuario = Usuario.query.filter_by(id=g.user_id).first()
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        gastos = Gasto.query.all()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gastos = Gasto.query.filter_by(id_usuario=current_user.get_id()).all()

    # converting the query objects
    # to list of jsons
    output = []
    for content in gastos:
        output.append({
            'id': content.id,
            'monto': content.monto,
            'descripcion': content.descripcion,
            'fecha': content.fecha,
            'tipo': content.tipo,
            'id_usuario': content.id_usuario
        })
    return paginated_query(page_number, page_size, output, "Gastos")


@bp.route('/get_all_by_monto', methods=['GET'])
@cross_origin()
@token_required
def get_all_by_monto():
    """Devuelve un JSON con info de todos los gastos generados por un usuario en base al monto"""

    try:
        monto = float(request.args.get('monto'))
    except (ValueError, TypeError):
        return jsonify({"message": "El monto ingresado es invalido"}), 400

    # Realizo los seteos necesarios para el paginado
    page_number = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    if page_size <= 0 or page_number <= 0:
        return jsonify({
            'message': 'Los campos de paginado no admiten valores negativos o cero'
        }), 400
    # Me fijo si el usuario logueado (token) es admin
    current_user: Usuario = Usuario.query.filter_by(id=g.user_id).first()
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        gastos = Gasto.query.filter_by(monto=monto).all()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gastos = Gasto.query.filter_by(id_usuario=current_user.get_id(), monto=monto).all()

    # converting the query objects
    # to list of jsons
    output = []
    for content in gastos:
        output.append({
            'id': content.id,
            'monto': content.monto,
            'descripcion': content.descripcion,
            'fecha': content.fecha,
            'tipo': content.tipo,
            'id_usuario': content.id_usuario
        })
    return paginated_query(page_number, page_size, output, "Gastos")

@bp.route('/get_first_by_monto', methods=['GET'])
@cross_origin()
@token_required
def get_first_by_monto():
    """Devuelve un JSON con info de el primer gasto en base al monto"""

    try:
        monto = float(request.args.get('monto'))
    except (ValueError, TypeError):
        return jsonify({"message": "El monto ingresado es invalido"}), 400

    current_user: Usuario = Usuario.query.filter_by(id=g.user_id).first()
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
def get_all_between_fechas():
    """Devuelve un JSON con info de todos los gastos generados por un usuario entre la fecha inicio y fecha fin"""
    # Realizo los seteos necesarios para el paginado
    page_number = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    if page_size <= 0 or page_number <= 0:
        return jsonify({
            'message': 'Los campos de paginado no admiten valores negativos o cero'
        }), 400
    # Obtengo el rango de fechas a buscar
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')
    try:
        fecha_inicio = datetime.datetime.strptime(fecha_inicio, '%Y-%m-%d') # Formato con fecha y hora: '%Y-%m-%d %H:%M:%S'
        fecha_fin = datetime.datetime.strptime(fecha_fin, '%Y-%m-%d') # Formato con fecha y hora: '%Y-%m-%d %H:%M:%S'
    except ValueError:
        return jsonify({'error': 'Formato de fecha incorrecto'}), 400
    current_user: Usuario = Usuario.query.filter_by(id=g.user_id).first()
    if current_user.is_admin:  # Si es admin, traigo los elementos de todos los usuarios
        gastos = Gasto.query.filter(
            Gasto.fecha >= fecha_inicio, Gasto.fecha <= fecha_fin
        ).all()
    else:  # Si NO es admin, traigo solo los elementos que le pertenecen al usuario logueado
        gastos = Gasto.query.filter(
            Gasto.id_usuario == current_user.get_id(),
            and_(Gasto.fecha >= fecha_inicio, Gasto.fecha <= fecha_fin)
        ).all()
    # converting the query objects
    # to list of jsons
    output = []
    for content in gastos:
        output.append({
            'id': content.id,
            'monto': content.monto,
            'descripcion': content.descripcion,
            'fecha': content.fecha,
            'tipo': content.tipo,
            'id_usuario': content.id_usuario
        })
    return paginated_query(page_number, page_size, output, "Gastos")


@bp.route('/get_all_by_tipo', methods=['GET'])
@cross_origin()
@token_required
def get_all_by_tipo():
    """Devuelve un JSON con info de todos los gastos generados por un usuario en base al tipo"""
    # Realizo los seteos necesarios para el paginado
    page_number = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    if page_size <= 0 or page_number <= 0:
        return jsonify({
            'message': 'Los campos de paginado no admiten valores negativos o cero'
        }), 400

    # Obtengo el tipo de gasto
    tipo = request.args.get('tipo')
    if not tipo:
        return jsonify({
            'message': 'El tipo ingresado es invalido'
        }), 400

    current_user: Usuario = Usuario.query.filter_by(id=g.user_id).first()
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        # gastos = Gasto.query.filter_by(tipo=tipo).all()
        gastos = Gasto.query.filter(
            Gasto.tipo.like(f'%{tipo}%')
        ).all()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        # gastos = Gasto.query.filter_by(id_usuario=current_user.get_id(), tipo=tipo).all()
        gastos = Gasto.query.filter(
            Gasto.id_usuario == current_user.get_id(),
            Gasto.tipo.like(f'%{tipo}%')
        ).all()
    # convierto la lista obtenida a coleccion de json

    # converting the query objects
    # to list of jsons
    output = []
    for content in gastos:
        output.append({
            'id': content.id,
            'monto': content.monto,
            'descripcion': content.descripcion,
            'fecha': content.fecha,
            'tipo': content.tipo,
            'id_usuario': content.id_usuario
        })
    return paginated_query(page_number, page_size, output, "Gastos")


@bp.route('/get_first_by_tipo', methods=['GET'])
@cross_origin()
@token_required
def get_first_gasto_by_tipo():
    """Devuelve un JSON con info del primer gasto generados por un usuario en base al tipo"""

    # Obtengo el tipo de gasto
    tipo = request.args.get('tipo')
    if not tipo:
        return jsonify({
            'message': 'El tipo ingresado es invalido'
        }), 400

    current_user: Usuario = Usuario.query.filter_by(id=g.user_id).first()
    if current_user.is_admin:  # Si es admin, traigo los gastos de todos los usuarios
        gasto = Gasto.query.filter(
            Gasto.tipo.like(f'%{tipo}%')
        ).first()
    else:  # Si NO es admin, traigo solo los gastos que le pertenecen al usuario logueado
        gasto = Gasto.query.filter(
            Gasto.id_usuario == current_user.get_id(),
            Gasto.tipo.like(f'%{tipo}%')
        ).first()
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

@bp.route('/add', methods=['POST'])
@cross_origin()
@token_required
def add():
    """Agrega un gasto al usuario logueado"""
    # Obtengo los datos necesarios para crear el elemento desde json enviado en el body
    try:
        descripcion = request.json["descripcion"]
        monto = request.json["monto"]
        tipo = request.json["tipo"]
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 400
    try:
        fecha = request.json["fecha"]
    except KeyError:
        fecha = None

    # ---------- INICIO DE VALIDACIONES ---------------------

    try:
        if float(monto) < 0.0:
            return jsonify({
                'message': 'monto negativo'  # 'No se permite crear elementos con monto negativo'
            }), 400
    except ValueError:
        return jsonify({
            'message': "Valor invalido en 'monto'"  # 'No se permite crear elementos con monto invalido'
        }), 400

    # Creo el elemento
    gasto = Gasto(g.user_id, descripcion, monto, tipo, fecha)

    if len(descripcion) > gasto.descripcion_char_limit or len(tipo) > gasto.tipo_char_limit: # 'superan los caracteres maximos permitidos'
        return jsonify({
            'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos.',
            'descripcion_max_characters': f"{gasto.descripcion_char_limit}",
            'tipo_max_characters': f"{gasto.tipo_char_limit}"
        }), 400

    # ---------- FIN DE VALIDACIONES ---------------------

    # Cargo el elemento en la base de datos
    Gasto.create(gasto)

    return jsonify({
        'message': 'Gasto registrado exitosamente'
    }), 201

@bp.route('/update', methods=['PUT'])
@cross_origin()
@token_required
def update():
    """Actualiza un gasto al usuario logueado"""
    # Obtengo los datos necesarios para actualizar el elemento desde json enviado en el body
    try:
        id_gasto = request.json["id"]
        descripcion = request.json["descripcion"]
        monto = request.json["monto"]
        tipo = request.json["tipo"]
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 400
    try:
        fecha = request.json["fecha"]
    except KeyError:
        fecha = None

    # Obtengo el id de usuario del token
    current_user: Usuario = Usuario.query.filter_by(id=g.user_id).first()

    # ---------- INICIO DE VALIDACIONES ---------------------

    try:
        if float(monto) < 0.0:
            return jsonify({
                'message': 'monto negativo'  # 'No se permite crear gastos con monto negativo'
            }), 400
    except ValueError:
        return jsonify({
            'message': "Valor invalido en 'monto'"  # 'No se permite crear gastos con monto invalido'
        }), 400

    # Busco el elemento
    gasto = Gasto.query.filter_by(id=id_gasto).first()

    if not (gasto and (current_user.is_admin or gasto.id_usuario != g.user_id)):
        return jsonify({
            'message': 'No se ha encontrado el elemento'
        }), 404

    if len(descripcion) > gasto.descripcion_char_limit or len(tipo) > gasto.tipo_char_limit: # 'superan los caracteres maximos permitidos'
        return jsonify({
            'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos.',
            'descripcion_max_characters': f"{gasto.descripcion_char_limit}",
            'tipo_max_characters': f"{gasto.tipo_char_limit}"
        }), 400

    # ---------- FIN DE VALIDACIONES ---------------------

    # Actualizo los valores del elemento
    gasto.descripcion = descripcion
    gasto.monto = monto
    gasto.tipo = tipo
    if fecha:
        gasto.fecha = fecha

    # Actualizo el elemento en la base de datos
    gasto.update()

    return jsonify({
        'message': 'Gasto actualizado exitosamente'
    }), 200

@bp.route('/delete', methods=['DELETE'])
@cross_origin()
@token_required
def delete():
    """Elimina un gasto al usuario logueado"""
    # Obtengo los datos necesarios para eliminar el elemento desde json enviado en el body
    try:
        id_gasto = request.json["id"]
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 400
    # Obtengo el id de usuario del token
    current_user: Usuario = Usuario.query.filter_by(id=g.user_id).first()

    gasto = Gasto.query.filter_by(id=id_gasto).first()

    if not (gasto and (current_user.is_admin or gasto.id_usuario != g.user_id)):
        return jsonify({
            'message': 'No se ha encontrado el elemento'
        }), 404

    gasto.delete()
    return jsonify({
        'message': 'Elemento eliminado exitosamente'
    }), 200