from flask_cors import cross_origin

from app import token_required
from flask import Blueprint, request

from app.models.ingresos import Ingreso

from app.controllers import elemento_financiero as ef

bp = Blueprint('ingresos', __name__, url_prefix='/ingresos')


@bp.route('/tipos', methods=['GET'])
@cross_origin()
@token_required
def get_tipos_distinct():
    """Devuelve una lista con todos los tipos de ingresos"""

    return ef.get_tipos_distinct(Ingreso)


@bp.route('/get_all', methods=['GET'])
@cross_origin()
@token_required
def get_all():
    """Devuelve un JSON con info de todos los ingresos generados por un usuario en base a diferentes filtros"""

    return ef.get_all(request, Ingreso, "ingresos")


@bp.route('/get', methods=['GET'])
@cross_origin()
@token_required
def get():
    """Devuelve un JSON con info de un ingreso generado por un usuario en base a diferentes filtros"""

    return ef.get(request, Ingreso, "ingreso")


@bp.route('/average', methods=['GET'])
@cross_origin()
@token_required
def average():
    """Devuelve un JSON con el promedio entre fechas de los ingresos de un usuario"""

    return ef.average(request, Ingreso)


@bp.route('/total', methods=['GET'])
@cross_origin()
@token_required
def total():
    """Devuelve un JSON con el total entre fechas de los gastos de un usuario"""

    return ef.total(request, Ingreso)


@bp.route('/count', methods=['GET'])
@cross_origin()
@token_required
def count():
    """Devuelve un JSON con la cantidad de ingresos entre fechas de los gastos de un usuario"""

    return ef.count(request, Ingreso)


@bp.route('/add', methods=['POST'])
@cross_origin()
@token_required
def add():
    """Agrega un ingreso al usuario logueado"""

    return ef.add(request, Ingreso)


@bp.route('/update', methods=['PUT'])
@cross_origin()
@token_required
def update():
    """Actualiza un ingreso al usuario logueado"""

    return ef.update(request, Ingreso)


@bp.route('/delete', methods=['DELETE'])
@cross_origin()
@token_required
def delete():
    """Elimina un ingreso al usuario logueado"""

    return ef.delete(request, Ingreso)
