from flask import Blueprint, jsonify, request, Response
import requests
import os
from src.models import User, Word_Frequency, db
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from datetime import datetime
from src.constants import news_sites


routes=Blueprint('/', __name__, url_prefix='/api/v1/')
auth=Blueprint('auth', __name__, url_prefix='/api/v1/auth')



# Azure Function Routes

@routes.get('/')
def get_all():
    return jsonify(news_sites.sites)    

@routes.get('/word_frequency')
def get_word_freq():
    website = request.args.get('website')
    if website not in news_sites.sites:
        return "Error - incorrect paramaters (website name) - see api documentation", 400
    az_func = os.environ.get('AZ_FUNC_1')
    url = az_func + '?website=' + website    
    res = requests.get(url)
    # return res.text
    return Response(
        res.text,
        status=res.status_code,
    )



    
# Database Routes

@routes.post('/add_word_frequency')
@jwt_required()
def add_frequency():
    current_user = get_jwt_identity()
    word_frequencies = str(request.json['word_frequencies'])
    website = request.json['website']
    w_f = Word_Frequency(user_id=current_user, wordCount=word_frequencies, website=website, updated_at=datetime.utcnow())
    db.session.add(w_f)
    db.session.commit()
    return 'aaaaaaaaaaaaaa'


@routes.get('/get_word_frequencies')
@jwt_required()
def get_frequencies():
    current_user = get_jwt_identity()
    user_wf_items = Word_Frequency.query.filter_by(user_id=current_user).all()
    res_data = {"data": []}

    for item in user_wf_items:
        res_item = {'id':item.id, 'created_at':item.updated_at, 'word_count': item.wordCount, 'site': item.website}
        res_data['data'].append(res_item)
        

    return jsonify(res_data)


    



    

@routes.get('/test_auth')
# @jwt_required()
def test_auth():
    user = get_jwt_identity()
    print(user)
    return 'secret '


# Auth Routes

@auth.post('/sign_up')
def sign_up():
    username=request.json['username']
    email=request.json['email']
    password=request.json['password']

    user = User(username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return 'user created'


@auth.post('/login')
def login():
    username=request.json['username']
    password=request.json['password']

    user = User.query.filter_by(username=username).first()

    if user:
        if user.password == password:
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            return jsonify({
                 'user':{
                    'access_token': access_token,
                    'refresh-token': refresh_token,
                    'username':user.username,
                    'email': user.email
                }
            })
    
    return jsonify({'Error': 'Provided credentials incorrect'})


# So when working on a front end we need something that will determine that the access token is close to expiring
#Then fire off this request (will need an auth header Bearer refreshToken! ) to get a new access token and set that

@auth.post("/refresh")
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)



