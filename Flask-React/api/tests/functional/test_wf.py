import json
from flask_jwt_extended import create_access_token


def test_saving_result_success(test_client, init_database):
    access_token = create_access_token(1)
    
    headers = {
        'Authorization': 'Bearer {}'.format(access_token)
    }
    res = test_client.post('/api/v1/result', 
                            data=json.dumps(dict(
                                word_frequencies_1=[{'value': 'news'},{'count': 4}],
                                website='bbc'
                            )), content_type='application/json',
                            headers=headers)
    
    assert res.status_code == 200