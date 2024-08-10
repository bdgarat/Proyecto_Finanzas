import datetime

from dateutil.relativedelta import relativedelta
from sqlalchemy import func

from flask import jsonify, g

from app.models.usuarios import Usuario
from app.utils.build_criterion import build_criterion
from app.utils.convert_to_foreign_currency import convert_to_foreign_currency, convert_list_to_foreign_currency

from app.utils.paginated_query import paginated_query
from app.utils.build_filters import build_filters


def get_tipos_distinct(model_object):
    """Devuelve una lista de todos los tipos"""

    tipos = model_object.query.with_entities(model_object.tipo).filter_by(id_usuario=g.user_id).distinct().all()
    tipos_list = [tipo.tipo for tipo in tipos]
    return tipos_list


def get_all(request, model_object, contents_name: str = "elementos"):
    """Devuelve un JSON con info de todos los elementos generados por un usuario en base a diferentes filtros"""

    # Realizo los seteos necesarios para el paginado
    page_number = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    if page_size <= 0 or page_number <= 0:
        return jsonify({'message': 'Los campos de paginado no admiten valores negativos o cero'}), 400

    try:
        current_user = Usuario.query.filter_by(id=g.user_id).first()
        filters = build_filters(request.args, current_user, model_object, True)
        contents = build_criterion(request.args, filters, model_object, True)
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

    currency = request.args.get('currency', default="ars", type=str)
    currency_type = "oficial"
    if currency != "ars":
        if currency == "dol":
            currency_type = request.args.get('currency_type', default="oficial", type=str)
        try:
            contents = convert_list_to_foreign_currency(contents, currency, currency_type)
        except Exception as e:
            return jsonify({"message": str(e)}), 400
    info_cotizaciones = {"cotizacion": currency, "tipo_de_cotizacion": currency_type}

    output = []
    for content in contents:
        output.append({
            'id': content.id,
            'monto': format(content.monto, ".2f"),
            'descripcion': content.descripcion,
            'fecha': content.fecha,
            'tipo': content.tipo,
            'id_usuario': content.id_usuario
        })

    return paginated_query(page_number, page_size, output, contents_name, info_cotizaciones)


def get(request, model_object, content_name: str = "elemento"):
    """Devuelve un JSON con info de un elemento generado por un usuario en base a diferentes filtros"""

    try:
        current_user = Usuario.query.filter_by(id=g.user_id).first()
        filters = build_filters(request.args, current_user, model_object, False)
        content = build_criterion(request.args, filters, model_object, False)
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

    currency = request.args.get('currency', default="ars", type=str)
    currency_type = "oficial"
    if currency != "ars":
        if currency == "dol":
            currency_type = request.args.get('currency_type', default="oficial", type=str)
        try:
            monto_convertido = convert_to_foreign_currency(content.monto, currency, currency_type)
        except Exception as e:
            return jsonify({"message": str(e)}), 400
        content.monto = monto_convertido
    info_cotizaciones = {"cotizacion": currency, "tipo_de_cotizacion": currency_type}

    output = {}
    if content:
        # Convierto el ingreso traido a json
        output = {
            'id': content.id,
            'monto': format(content.monto, ".2f"),
            'descripcion': content.descripcion,
            'fecha': content.fecha,
            'tipo': content.tipo,
            'id_usuario': content.id_usuario
        }
    return jsonify({content_name: output, 'additional_info': info_cotizaciones}), 200


def average(request, model_object):
    """Devuelve un JSON con el promedio entre fechas de los elementos de un usuario"""

    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    if fecha_inicio and fecha_fin:
        try:
            fecha_inicio = datetime.datetime.strptime(fecha_inicio, '%Y-%m-%d')
            fecha_fin = datetime.datetime.strptime(fecha_fin, '%Y-%m-%d')
        except ValueError:
            return jsonify({
                'message': 'Formato de fecha incorrecto'
            }), 400
        if fecha_fin <= fecha_inicio:
            return jsonify({
                'message': 'La fecha de inicio debe ser anterior a la fecha de fin'
            }), 400
    else:
        fecha_inicio = datetime.datetime.utcnow() - relativedelta(months=1)
        fecha_fin = datetime.datetime.utcnow()

    average_value = model_object.query.with_entities(func.avg(model_object.monto)).filter(
        model_object.fecha >= fecha_inicio,
        model_object.fecha <= fecha_fin
    ).scalar()
    average_value = average_value if average_value else 0.0  # Devuelve None si no trae datos de query

    currency = request.args.get('currency', default="ars", type=str)
    currency_type = "oficial"
    if currency != "ars":
        if currency == "dol":
            currency_type = request.args.get('currency_type', default="oficial", type=str)
        try:
            average_value = convert_to_foreign_currency(average_value, currency, currency_type)
        except Exception as e:
            return jsonify({"message": str(e)}), 400
    info_cotizaciones = {"cotizacion": currency, "tipo_de_cotizacion": currency_type}

    return jsonify({'average': format(average_value, ".2f"), 'additional_info': info_cotizaciones}), 200


def add(request, model_object):
    """Agrega un elemento al usuario logueado"""
    # Obtengo los datos necesarios para crear el elemento desde json enviado en el body
    try:
        descripcion = request.json["descripcion"]
        monto = request.json["monto"]
        tipo = request.json["tipo"]
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios estan faltantes'
        }), 400
    try:
        fecha = request.json["fecha"]
    except KeyError:
        fecha = None

# ---------- INICIO DE VALIDACIONES ---------------------

    if not monto or not tipo:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 400

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
    elemento = model_object(g.user_id, descripcion, monto, tipo, fecha)

    if len(descripcion) > elemento.descripcion_char_limit or len(tipo) > elemento.tipo_char_limit:  # 'superan los caracteres maximos permitidos'
        return jsonify({
            'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos.',
            'descripcion_max_characters': f"{elemento.descripcion_char_limit}",
            'tipo_max_characters': f"{elemento.tipo_char_limit}"
        }), 400

    # ---------- FIN DE VALIDACIONES ---------------------

    # Cargo el elemento en la base de datos
    model_object.create(elemento)

    return jsonify({
        'message': 'Ingreso registrado exitosamente'
    }), 201


def update(request, model_object, content_name: str = "elemento"):
    """Actualiza un elemento al usuario logueado"""
    # Obtengo los datos necesarios para actualizar el elemento desde json enviado en el body
    try:
        id_elemento = request.json["id"]
        descripcion = request.json["descripcion"]
        monto = request.json["monto"]
        tipo = request.json["tipo"]
    except KeyError:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios estan faltantes'
        }), 400
    try:
        fecha = request.json["fecha"]
    except KeyError:
        fecha = None

    if not id_elemento or not monto or not tipo:
        return jsonify({
            'message': 'Uno o más campos de entrada obligatorios se encuentran vacios'
        }), 400

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
    elemento = model_object.query.filter_by(id=id_elemento).first()

    if not (elemento and (current_user.is_admin or elemento.id_usuario != g.user_id)):
        return jsonify({
            'message': 'No se ha encontrado el elemento'
        }), 404

    if len(descripcion) > elemento.descripcion_char_limit or len(tipo) > elemento.tipo_char_limit:  # 'superan los caracteres maximos permitidos'
        return jsonify({
            'message': 'Uno o más campos de entrada superan la cantidad maxima de caracteres permitidos.',
            'descripcion_max_characters': f"{elemento.descripcion_char_limit}",
            'tipo_max_characters': f"{elemento.tipo_char_limit}"
        }), 400

    # ---------- FIN DE VALIDACIONES ---------------------

    # Actualizo los valores del elemento
    elemento.descripcion = descripcion
    elemento.monto = monto
    elemento.tipo = tipo
    if fecha:
        elemento.fecha = fecha

    # Actualizo el elemento en la base de datos
    elemento.update()

    return jsonify({
        'message': f'{content_name} actualizado exitosamente'
    }), 200


def delete(request, model_object, content_name: str = "elemento"):
    """Elimina un elemento al usuario logueado"""

    id_elemento = request.args.get('id', type=int)
    # Obtengo el id de usuario del token
    current_user: Usuario = Usuario.query.filter_by(id=g.user_id).first()

    elemento = model_object.query.filter_by(id=id_elemento).first()

    if not (elemento and (current_user.is_admin or elemento.id_usuario != g.user_id)):
        return jsonify({
            'message': f'No se ha encontrado el {content_name}'
        }), 404

    elemento.delete()
    return jsonify({
        'message': f'{content_name} eliminado exitosamente'
    }), 200
