
import json
def test_login_page(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/login' page is requested (GET)
    THEN check the response is valid
    """
    response = test_client.get('/api/v1/')
    assert response.status_code == 200



def test_login_correct_creds(test_client, init_database):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/v1/auth/login' route is requests ("POST") with correct credentials
    THEN check the response is valid with the expected response data 
    """

    response = test_client.post('/api/v1/auth/login', data=json.dumps(dict(username='test_user_1', password='test_password1')),
                                content_type="application/json")

    res_data = json.loads(response.data)
    assert response.status_code == 200
    assert 'user' in res_data
    assert res_data['user']['username']== 'test_user_1'
    assert 'access_token' in res_data['user']
    assert 'refresh_token' in res_data['user']

    

def test_login_incorrect_password(test_client, init_database):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/v1/auth/login' route is requests ("POST") with an incorrect password
    THEN check the response is valid with the expected response data 
    """

    response = test_client.post('/api/v1/auth/login', data=json.dumps(dict(username='test_user_1', password='wrong_pass')),
                                content_type="application/json")
    res_data = json.loads(response.data)
    assert response.status_code == 401
    assert res_data['error'] == 'Incorrect credentials'



def test_login_no_existing_username(test_client, init_database):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/v1/auth/login' route is requests ("POST") with a username not in the database
    THEN check the response is valid with the correct error message 
    """

    response = test_client.post('/api/v1/auth/login', data=json.dumps(dict(username='test_user_not_exist', password='wrong_pass')),
                                content_type="application/json")
    res_data = json.loads(response.data)
    assert response.status_code == 400
    assert res_data['error'] == 'Username does not exist'




def test_user_signup_correct(test_client, init_database):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/v1/auth/sign-up' route is request ("POST") with the correct credentials of an existing user
    THEN check the response is valid with the expected response data 
    """
    response = test_client.post('/api/v1/auth/sign-up', data=json.dumps(
        dict(username='test_user_2', password='test_pass', confirm_password='test_pass')),
                                content_type="application/json")

    res_data = json.loads(response.data)
    assert response.status_code == 201
    assert res_data['msg'] == 'Account created successfully'




def test_user_signup_user_already_exists(test_client, init_database):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/v1/auth/sign-up' route is requests ("POST") with a username that already exists in the database
    THEN check the response is valid with the expected error message
    """
    response = test_client.post('/api/v1/auth/sign-up', data=json.dumps(
        dict(username='test_user_1', password='test_pass', confirm_password='test_pass')),
                                content_type="application/json")

    res_data = json.loads(response.data)
    assert response.status_code == 400
    assert res_data['error'] == 'Username already exists'
    


def test_user_signup_password_not_identical(test_client, init_database):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/v1/auth/sign-up' route is requests ("POST") where the password and confirm-passwords do not match
    THEN check the response is valid with the expected error message 
    """
    response = test_client.post('/api/v1/auth/sign-up', data=json.dumps(
        dict(username='test_user_1', password='test_pass', confirm_password='test_badpass')),
                                content_type="application/json")

    res_data = json.loads(response.data)
    assert response.status_code == 400
    assert res_data['error'] == 'Passwords do not match'



