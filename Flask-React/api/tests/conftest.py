from models import User
import pytest
from app import db, create_app



@pytest.fixture(scope='module')
def created_user():
    user = User('test_user', 'test_password')
    return user


@pytest.fixture(scope='module')
def test_client():
    flask_app = create_app()

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as testing_client:
        # Establish an application context
        with flask_app.app_context():
            yield testing_client  # this is where the testing happens!



@pytest.fixture(scope='module')
def init_database(test_client):
    # Create the database and the database table
    db.create_all()

    # Insert user data
    user1 = User('test_user_1', 'test_password1')
    db.session.add(user1)
    # db.session.add(user2)

    # Commit the changes for the users
    db.session.commit()

    yield  # this is where the testing happens!

    db.drop_all()
