from flask import Blueprint, jsonify, request, Response
import requests
import os
from models import User, Word_Frequency, db
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from datetime import datetime
from constants import news_sites


routes=Blueprint('/', __name__, url_prefix='/api/v1')
auth=Blueprint('auth', __name__, url_prefix='/api/v1/auth')



# Azure Function Routes

@routes.get('/')
def get_all():
    return jsonify(news_sites.sites)    


@routes.get('/word_frequency')
def get_word_freq():
    websites = request.args.getlist('websites')
    print(websites)
    az_func_url = os.environ.get('AZ_FUNC_1')
    for i, website in enumerate(websites):
        if website not in news_sites.sites:
            return "Error - incorrect paramaters (website name) - see api documentation", 400
        if i == 0:
            az_func_url += '?websites=' + website
        else:
            az_func_url += '&websites=' + website

    

            
    res = requests.get(az_func_url)
    print(res.text)
    return Response(
        res.text,
        status=res.status_code,
    )



    
# Database Routes

@routes.post('/add_word_frequency')
@jwt_required()
def add_frequency():
    print('INCOMING POST WF ')
    current_user = get_jwt_identity()
    word_frequencies_1 = str(request.json['word_frequencies_1'])
    website_1 = request.json['website_1']
    word_frequencies_2 = None
    website_2 = None
    word_frequencies_3 = None
    website_3 = None
    print(request.json)
    if 'word_frequencies_2' in request.json: 
        word_frequencies_2 = str(request.json['word_frequencies_2'])
        website_2 = request.json['website_2']
    if 'word_frequencies_3' in request.json:
        word_frequencies_3 = str(request.json['word_frequencies_3'])
        website_3 = request.json['website_3']
    w_f = Word_Frequency(user_id=current_user, 
                         word_count_1=word_frequencies_1, 
                         website_1=website_1, 
                         updated_at=datetime.utcnow(),
                         website_2=website_2,
                         word_count_2=word_frequencies_2,
                         website_3=website_3,
                         word_count_3=word_frequencies_3)

    db.session.add(w_f)
    db.session.commit()
    print('word frequency data saved')
    return 'Post successful'


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
@jwt_required()
def test_auth():
    user = get_jwt_identity()
    return user


# Auth Routes

@auth.post('/sign_up')
def sign_up():
    username=request.json['username']
    password=request.json['password']

    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()

    return 'user created successfully'


@auth.post('/login')
def login():
    print('=================================')
    print(request.json)
    username=request.json['username']
    password=request.json['password']

    user = User.query.filter_by(username=username).first()

    if user:
        if user.password == password:
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            print("user logged in successfully")
            return jsonify({
                 'user':{
                    'access_token': access_token,
                    'refresh-token': refresh_token,
                    'username':user.username
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



