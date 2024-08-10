from flask_cors import cross_origin

from app import token_required
from flask import Blueprint, request

from app.controllers import elemento_financiero as ef
from app.models.gastos import Gasto

bp = Blueprint('gastos', __name__, url_prefix='/gastos')


@bp.route('/tipos', methods=['GET'])
@cross_origin()
@token_required
def get_tipos_distinct():
    """Devuelve una lista con todos los tipos de gastos"""

    return ef.get_tipos_distinct(Gasto)


@bp.route('/get_all', methods=['GET'])
@cross_origin()
@token_required
def get_all():
    """Devuelve un JSON con info de todos los gastos generados por un usuario en base a diferentes filtros"""

    return ef.get_all(request, Gasto, "gastos")


@bp.route('/get', methods=['GET'])
@cross_origin()
@token_required
def get():
    """Devuelve un JSON con info de un gasto generado por un usuario en base a diferentes filtros"""

    return ef.get(request, Gasto, "gasto")


@bp.route('/average', methods=['GET'])
@cross_origin()
@token_required
def average():
    """Devuelve un JSON con el promedio entre fechas de los gastos de un usuario"""

    return ef.average(request, Gasto)


@bp.route('/add', methods=['POST'])
@cross_origin()
@token_required
def add():
    """Agrega un gasto al usuario logueado"""

    return ef.add(request, Gasto)


@bp.route('/update', methods=['PUT'])
@cross_origin()
@token_required
def update():
    """Actualiza un gasto al usuario logueado"""

    return ef.update(request, Gasto)


@bp.route('/delete', methods=['DELETE'])
@cross_origin()
@token_required
def delete():
    """Elimina un gasto al usuario logueado"""

    return ef.delete(request, Gasto)
