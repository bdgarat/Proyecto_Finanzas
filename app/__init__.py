from functools import wraps

import jwt
from flask import Flask, request, jsonify

from app.db import db
from app.db_config import db_config

from app.models.usuarios import Usuario
from flask_migrate import Migrate
# Agregar los cambios de modelos a db: "flask db migrate"
# Commitear los cambios de modelos a db: "flask db upgrade"

app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{db_config.get('USER')}:{db_config.get('PASSWORD')}@{db_config.get('HOST')}/{db_config.get('DATABASE')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "super-secret" # CAMBIAR A ALGO SEGURO EN PRODUCCION!!!

db.init_app(app)

with app.app_context():
    db.create_all()

migrate = Migrate(app, db)
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message': 'Falta JWT Token'}), 401

        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = Usuario.query.filter_by(id=data["id"]).first()
        except:
            return jsonify({
                'message': 'JWT Token invalido'
            }), 401
        # returns the current logged in users context to the routes
        return f(current_user, *args, **kwargs)

    return decorated

@app.route("/")
# @login_required
def home():
    return ("Eureka!")

from app.controllers import auth, usuarios, ingresos, gastos
app.register_blueprint(auth.bp)
app.register_blueprint(usuarios.bp)
app.register_blueprint(ingresos.bp)
app.register_blueprint(gastos.bp)


if __name__ == '__main__':
    app.run(debug=True)