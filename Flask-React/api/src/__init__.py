from flask import Flask
import os

from flask_jwt_extended import JWTManager
from src.routes import routes, auth
from src.models import db
from datetime import timedelta
from flask_cors import CORS



def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get('SECRET_KEY'),
            SQLALCHEMY_DATABASE_URI=os.environ.get('SQLALCHEMY_DB_URI'),
            SQLALCHEMY_TRACK_MODIFICATIONS=False,
            JWT_ACCESS_TOKEN_EXPIRES=timedelta(hours=3),
            JWT_REFRESH_TOKEN_EXPIRES=timedelta(days=30),
            JWT_SECRET_KEY=os.environ.get('JWT_SECRET_KEY'))
            
            


    else:
        app.config.from_mapping(test_config)

    db.app = app
    db.init_app(app)
        
    JWTManager(app)
    CORS(app)
 
    app.register_blueprint(routes)
    app.register_blueprint(auth)


    return app