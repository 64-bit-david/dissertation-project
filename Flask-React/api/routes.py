import json
from re import L
from flask import Blueprint, jsonify, request, Response, make_response
import requests
import os
from models import User, Word_Frequency, db
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from datetime import datetime
from constants import news_sites
from werkzeug.security import generate_password_hash, check_password_hash


routes=Blueprint('/', __name__, url_prefix='/api/v1')
auth=Blueprint('auth', __name__, url_prefix='/api/v1/auth')

# Azure Function Routes

@routes.get('/')
def get_all():
    return make_response(jsonify({'data': news_sites.sites}), 200)    


@routes.get('/word_frequency')
def get_word_freq():
    try: 
        websites = request.args.getlist('websites')
        print(websites)
        az_func_url = os.environ.get('AZ_FUNC_1')
        for i, website in enumerate(websites):
            if website not in news_sites.sites:
                return make_response(jsonify({'error': f"Incorrect parameters. The website '{website}' is not currently supported "}), 422)
            if i == 0:
                az_func_url += '?websites=' + website
            else:
                az_func_url += '&websites=' + website
        
        res = requests.get(az_func_url)
        if(res.status_code != 200):
            return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)
        #make_response seems to double eoncode json so use Response object instead
        return Response(
            res.text,
            status=res.status_code
        )
   
    except: 
        return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)




    
# Database Routes

@routes.post('/add_word_frequency')
@jwt_required()
def add_frequency():
    print('adding word frequency')
    try: 
        current_user = get_jwt_identity()
        if 'word_frequencies_1' not in request.json:
            return make_response(jsonify({'error': "Missing intial website parameter (word_frequencies_1)"}), 400)
        word_frequencies_1 = str(request.json['word_frequencies_1'])
        website_1 = request.json['website_1']
        if website_1 not in news_sites.sites:
                return make_response(jsonify({'error': f"Website name '{website_1}' not valid"}), 400)
        word_frequencies_2 = None
        website_2 = None
        word_frequencies_3 = None
        website_3 = None
        if 'word_frequencies_2' in request.json: 
            word_frequencies_2 = str(request.json['word_frequencies_2'])
            website_2 = request.json['website_2']
            if website_2 not in news_sites.sites:
                return make_response(jsonify({'error': f"website name '{website_2}' not valid"}), 400)
        if 'word_frequencies_3' in request.json:
            word_frequencies_3 = str(request.json['word_frequencies_3'])
            website_3 = request.json['website_3']
            if website_3 not in news_sites.sites:
                return make_response(jsonify({'error': f"website name '{website_3}' not valid"}), 400)
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
        return make_response(jsonify({'msg': 'Result saved successfully'}), 201)
    except:
        return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)

        


@routes.get('/get_word_frequencies')
@jwt_required()
def get_frequencies():
    try:
        current_user = get_jwt_identity()
        user_wf_items = Word_Frequency.query.filter_by(user_id=current_user).all()
        res_data = []
        for item in user_wf_items:
            results_type = ''
            if item.website_2:
                results_type = 'wfc'
            else:
                results_type = 'wf'
            res_item = {'id':item.id, 'created_at':item.updated_at, 'results_type':results_type}
            res_data.append(res_item)
        return make_response(jsonify({'results': res_data})), 200
    except:
        return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)


    

@routes.get('/test_auth')
@jwt_required()
def test_auth():
    user = get_jwt_identity()
    return user


# Auth Routes

@auth.post('/sign-up')
def sign_up():
    try: 
        username=request.json['username']
        password=request.json['password']
        confirm_pass = request.json['confirm_password']
        if password != confirm_pass:
            return make_response(jsonify({'error': 'passwords do not match'}))
        # hash_pass = generate_password_hash(password, 'sha256')
        user = User(username, password)
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify({'msg': "Account created successfully"}), 201)

    except:
        return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)





@auth.get('/login')
def login():
    print('=================================')
    print(request.json)
    # try: 
    username=request.json['username']
    password=request.json['password']
    if not username or not password:
        return make_response(jsonify({'error': 'Incorrect Parameters'}), 400)

    user = User.query.filter_by(username=username).first()

    if user:
        if user.password_match(password):
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            print("user logged in successfully")
            return make_response(jsonify({
                'user':{
                    'access_token': access_token,
                    'refresh-token': refresh_token,
                    'username':user.username
                }
            }), 200)
    else:
        return make_response(jsonify({'error': 'Username does not exist'}))
    
    return jsonify({'Error': 'Provided credentials incorrect'})
    # except: 
        # return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)

# So when working on a front end we need something that will determine that the access token is close to expiring
#Then fire off this request (will need an auth header Bearer refreshToken! ) to get a new access token and set that

@auth.post("/refresh")
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)



