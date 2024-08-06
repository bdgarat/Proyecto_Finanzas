import datetime

from flask_cors import cross_origin

from app import token_required
from flask import Blueprint, jsonify, request, g
from sqlalchemy import and_

from app.models.ingresos import Ingreso
from app.models.usuarios import Usuario

from app.utils.paginated_query import paginated_query

bp = Blueprint('ingresos', __name__, url_prefix='/ingresos')

def build_filters(params, current_user):
    filters = []

    monto = params.get('monto')
    tipo = params.get('tipo')
    fecha_inicio = params.get('fecha_inicio')
    fecha_fin = params.get('fecha_fin')

    if monto:
        try:
            monto = float(monto)
            filters.append(Ingreso.monto == monto)
        except (ValueError, TypeError):
            raise ValueError("El monto ingresado es invalido")

    if tipo:
        filters.append(Ingreso.tipo.like(f'%{tipo}%'))

    if fecha_inicio and fecha_fin:
        try:
            fecha_inicio = datetime.datetime.strptime(fecha_inicio, '%Y-%m-%d')
            fecha_fin = datetime.datetime.strptime(fecha_fin, '%Y-%m-%d')
            if fecha_fin <= fecha_inicio:
                raise ValueError('La fecha de inicio debe ser anterior a la fecha de fin')
            filters.append(and_(Ingreso.fecha >= fecha_inicio, Ingreso.fecha <= fecha_fin))
        except ValueError:
            raise ValueError('Formato de fecha incorrecto')

    if not current_user.is_admin:
        filters.append(Ingreso.id_usuario == current_user.get_id())

    return filters


@bp.route('/get_all', methods=['GET'])
@cross_origin()
@token_required
def get_all():
    """Devuelve un JSON con info de todos los ingresos generados por un usuario en base a diferentes filtros"""

    # Realizo los seteos necesarios para el paginado
    page_number = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    if page_size <= 0 or page_number <= 0:
        return jsonify({'message': 'Los campos de paginado no admiten valores negativos o cero'}), 400

    try:
        current_user = Usuario.query.filter_by(id=g.user_id).first()
        filters = build_filters(request.args, current_user)
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

    ingresos = Ingreso.query.filter(*filters).all()

    output = []
    for content in ingresos:
        output.append({
            'id': content.id,
            'monto': content.monto,
            'descripcion': content.descripcion,
            'fecha': content.fecha,
            'tipo': content.tipo,
            'id_usuario': content.id_usuario
        })

    return paginated_query(page_number, page_size, output, "ingresos")

@bp.route('/get', methods=['GET'])
@cross_origin()
@token_required
def get():
    """Devuelve un JSON con info de un ingreso generado por un usuario en base a diferentes filtros"""

    try:
        current_user = Usuario.query.filter_by(id=g.user_id).first()
        filters = build_filters(request.args, current_user)
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

    ingreso = Ingreso.query.filter(*filters).first()

    output = {}
    if ingreso:
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

@bp.route('/add', methods=['POST'])
@cross_origin()
@token_required
def add():
    """Agrega un ingreso al usuario logueado"""
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
    ingreso = Ingreso(g.user_id, descripcion, monto, tipo, fecha)

    if len(descripcion) > ingreso.descripcion_char_limit or len(tipo) > ingreso.tipo_char_limit: # 'superan los caracteres maximos permitidos'
        return jsonify({
            'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos.',
            'descripcion_max_characters': f"{ingreso.descripcion_char_limit}",
            'tipo_max_characters': f"{ingreso.tipo_char_limit}"
        }), 400

    # ---------- FIN DE VALIDACIONES ---------------------

    # Cargo el elemento en la base de datos
    Ingreso.create(ingreso)

    return jsonify({
        'message': 'Ingreso registrado exitosamente'
    }), 201

@bp.route('/update', methods=['PUT'])
@cross_origin()
@token_required
def update():
    """Actualiza un ingreso al usuario logueado"""
    # Obtengo los datos necesarios para actualizar el elemento desde json enviado en el body
    try:
        id_ingreso = request.json["id"]
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
                'message': 'monto negativo'  # 'No se permite crear ingresos con monto negativo'
            }), 400
    except ValueError:
        return jsonify({
            'message': "Valor invalido en 'monto'"  # 'No se permite crear ingresos con monto invalido'
        }), 400

    # Busco el elemento
    ingreso = Ingreso.query.filter_by(id=id_ingreso).first()

    if not (ingreso and (current_user.is_admin or ingreso.id_usuario != g.user_id)):
        return jsonify({
            'message': 'No se ha encontrado el elemento'
        }), 404

    if len(descripcion) > ingreso.descripcion_char_limit or len(tipo) > ingreso.tipo_char_limit: # 'superan los caracteres maximos permitidos'
        return jsonify({
            'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos.',
            'descripcion_max_characters': f"{ingreso.descripcion_char_limit}",
            'tipo_max_characters': f"{ingreso.tipo_char_limit}"
        }), 400

    # ---------- FIN DE VALIDACIONES ---------------------

    # Actualizo los valores del elemento
    ingreso.descripcion = descripcion
    ingreso.monto = monto
    ingreso.tipo = tipo
    if fecha:
        ingreso.fecha = fecha

    # Actualizo el elemento en la base de datos
    ingreso.update()

    return jsonify({
        'message': 'Ingreso actualizado exitosamente'
    }), 200

@bp.route('/delete', methods=['DELETE'])
@cross_origin()
@token_required
def delete():
    """Elimina un ingreso al usuario logueado"""

    id_ingreso = request.args.get('id', type=int)
    # Obtengo el id de usuario del token
    current_user: Usuario = Usuario.query.filter_by(id=g.user_id).first()

    ingreso = Ingreso.query.filter_by(id=id_ingreso).first()

    if not (ingreso and (current_user.is_admin or ingreso.id_usuario != g.user_id)):
        return jsonify({
            'message': 'No se ha encontrado el elemento'
        }), 404

    ingreso.delete()
    return jsonify({
        'message': 'Elemento eliminado exitosamente'
    }), 200
