import os
from flask import Flask
from models import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta
from routes import get_word_freq


def test_sched():
    get_word_freq('bbc')

def database_uri() -> str:
    database_str = "mariadb+mariadbconnector"
    db_uri = database_str + "://"
    db_uri += os.environ.get("DB_USER", default="none") + ":"
    db_uri += os.environ.get("DB_PASSWORD", default="none") + "@"
    db_uri += os.environ.get("DB_SERVER", default="127.0.0.1") + ":"
    db_uri += os.environ.get("DB_PORT", default="3306") + "/"
    db_uri += os.environ.get("DB_NAME", default="mydb")
    return db_uri


def create_app(test_config:dict = {}):
    app = Flask(__name__)
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nta.db'
    app.config['SQLALCHEMY_DATABASE_URI'] = database_uri()
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=3)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
    app.config['JWT_SECRET_KEY']=os.environ.get('JWT_SECRET_KEY')
    app.config["JWT_ALGORITHM"] = "HS256"
    if len(test_config) > 0:
        app.config.update(test_config)
    with app.app_context():
        db.init_app(app)
        db.create_all()
        
    JWTManager(app)
    CORS(app)
    from routes import routes, auth
    app.register_blueprint(routes)
    app.register_blueprint(auth)

    return app



if __name__ == '__main__':
    app = create_app()
    svc_host = os.environ.get("SVC_HOST", default=None)
    print(svc_host)
    app.run(debug=True, host=svc_host)