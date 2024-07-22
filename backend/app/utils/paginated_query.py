from flask import jsonify


def paginated_query(page_number: int, page_size: int, contents: list, contents_name: str = "Contents"):
    """Genera una respuesta paginada de ingreso/gasto a partir del numero de pagina, tamaño de pagina y una lista de contenidos"""
    # Realizo los seteos necesarios para el paginado
    if page_size <= 0 or page_number <= 0:
        return jsonify({
            'message': 'Los campos de paginado no admiten valores negativos o cero'
        }), 403
    page_start = ((page_number - 1) * page_size)
    page_end = page_start + (page_size - 1)
    next_page = page_number + 1 if (len(contents) - 1) > page_end else None

    # converting the query objects
    # to list of jsons
    output = []
    for content in contents[page_start:page_end + 1]:
        output.append({
            'id': content.id,
            'monto': content.monto,
            'descripcion': content.descripcion,
            'fecha': content.fecha,
            'tipo': content.tipo,
            'id_usuario': content.id_usuario
        })

    return jsonify({'total_entries': len(contents),
                    'page': page_number,
                    'page_size': page_size,
                    'next_page': next_page,
                    contents_name: output}), 200