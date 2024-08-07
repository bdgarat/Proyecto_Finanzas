from sqlalchemy import desc


def build_criterion_all(params, filters, model_object):
    criterion = params.get('criterion')
    if not criterion:
        result = (model_object.query.filter(*filters).all())
    else:
        match criterion:  # Caracteristicas ordenamiento
            case "fecha_min":
                result = model_object.query.filter(*filters).order_by(model_object.fecha).all()
            case "fecha_max":
                result = model_object.query.filter(*filters).order_by(desc(model_object.fecha)).all()
            case "monto_min":
                result = model_object.query.filter(*filters).order_by(model_object.monto).all()
            case "monto_max":
                result = model_object.query.filter(*filters).order_by(desc(model_object.monto)).all()
            case "created_on_min":
                result = model_object.query.filter(*filters).order_by(model_object.created_on).all()
            case "created_on_max":
                result = model_object.query.filter(*filters).order_by(desc(model_object.created_on)).all()
            case "last_updated_on_min":
                result = model_object.query.filter(*filters).order_by(model_object.last_updated_on).all()
            case "last_updated_on_max":
                result = model_object.query.filter(*filters).order_by(desc(model_object.last_updated_on)).all()
            case _:
                raise ValueError("Parametro invalido en 'criterion'")

    return result


def build_criterion_first(params, filters, model_object):
    criterion = params.get('criterion')
    if not criterion:
        result = (model_object.query.filter(*filters).first())
    else:
        match criterion:  # Caracteristicas ordenamiento
            case "fecha_min":
                result = model_object.query.filter(*filters).order_by(model_object.fecha).first()
            case "fecha_max":
                result = model_object.query.filter(*filters).order_by(desc(model_object.fecha)).first()
            case "monto_min":
                result = model_object.query.filter(*filters).order_by(model_object.monto).first()
            case "monto_max":
                result = model_object.query.filter(*filters).order_by(desc(model_object.monto)).first()
            case "created_on_min":
                result = model_object.query.filter(*filters).order_by(model_object.created_on).first()
            case "created_on_max":
                result = model_object.query.filter(*filters).order_by(desc(model_object.created_on)).first()
            case "last_updated_on_min":
                result = model_object.query.filter(*filters).order_by(model_object.last_updated_on).first()
            case "last_updated_on_max":
                result = model_object.query.filter(*filters).order_by(desc(model_object.last_updated_on)).first()
            case _:
                raise ValueError("Parametro invalido en 'criterion'")

    return result
