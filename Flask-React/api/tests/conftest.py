from models import User
import pytest
from app import db, create_app
from flask_jwt_extended import create_access_token




@pytest.fixture(scope='module')
def created_user():
    user = User('test_user', 'test_password')
    return user


@pytest.fixture(scope='module')
def test_client():
    test_config = { 
            'SQLALCHEMY_DATABASE_URI': "sqlite:///:memory:",
            'TESTING': True,
            'JWT_SECRET_KEY': 'randomsecret'
        }
    flask_app = create_app(test_config)
    with flask_app.test_client() as testing_client:
        with flask_app.app_context():
            yield testing_client  


@pytest.fixture(scope='module')
def init_database(test_client):
    # Create the database and the db tables
    db.create_all()
    user1 = User('test_user_1', 'test_password1')
    db.session.add(user1)
    db.session.commit()
    yield  
    db.drop_all()



