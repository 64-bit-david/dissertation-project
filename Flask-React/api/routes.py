import json
from flask import Blueprint, jsonify, request, Response, make_response
import requests
import os
from models import User, WebsiteData, db, WebsiteData24
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from datetime import datetime
from constants import news_sites
import ast
import traceback
from collections import Counter
from nltk.sentiment.vader import SentimentIntensityAnalyzer




routes=Blueprint('/', __name__, url_prefix='/api/v1')
auth=Blueprint('auth', __name__, url_prefix='/api/v1/auth')


def helper_sentimement_analyser(plain_text):
    sent_analyser = SentimentIntensityAnalyzer()
    sent_score = sent_analyser.polarity_scores(plain_text)
    return sent_score


def helper_word_counter(text):
    """
    A function that counts the frequency of each word in a string  
    """

    tokens = [t for t in text.split()]
    counts = Counter(tokens)
    result = [{'value': key, 'count': count} for key, count in counts.most_common(50)]
    return result


# Azure Function Routes

@routes.get('/')
def get_all():
    return make_response(jsonify({'data': news_sites.sites}), 200)    


@routes.get('/word-frequency')
def get_word_freq(websites=None):
    try: 
        if not request.args.getlist('websites'):
            return make_response(jsonify({'error': "Please provide at least one 'websites' query parameter"}), 400)
        websites = request.args.getlist('websites')
        if len(websites) > 3:
            return make_response(jsonify({'error': "This endpoint currently accepts a maximum of 3 'websites' url parameters"}), 400)
        az_func_url = os.environ.get('AZ_FUNC_1')
        for i, website in enumerate(websites):
            if website not in news_sites.sites:
                return make_response(jsonify({'error': f"Incorrect parameters. The website '{website}' is not currently supported"}), 400)
            if i == 0:
                az_func_url += '?websites=' + website
            else:
                az_func_url += '&websites=' + website
        
        # Call the function with the url params
        func_response = requests.get(az_func_url)
        func_response_dict = json.loads(func_response.text)
        # Need to send the uncounted words to the client so the client can post the uncounted words to the post request if the user chooses to save their results
        res = {"counted": {}, "uncounted": func_response_dict, "sentiment": {}}
        
        for key in func_response_dict:
            # count the individual words for each website
            counted_words = helper_word_counter(func_response_dict[key])
            res["counted"][key] = counted_words
            #get the sentiment of the words
            sentiment_intensty = helper_sentimement_analyser(func_response_dict[key])
            res['sentiment'][key] = sentiment_intensty
        print(res)

        if(func_response.status_code != 200):
            return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)

        return make_response(res, func_response.status_code)

    except Exception:
        traceback.print_exc() 
        return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)



@routes.get('/historical-results')
def get_24hour_results():
    try:
        if not request.args.getlist('websites'):
            return make_response(jsonify({'error': "Please provide at least one 'websites' query parameter"}), 400)
        websites = request.args.getlist('websites')
        if len(websites) > 3:
            return make_response(jsonify({'error': "This endpoint currently accepts a maximum of 3 'websites' url parameters"}), 400)
        words_list_websites = {}

        for site in websites:
            data = WebsiteData24.query.filter_by(website=site).all()
            for item in data:
                if not item.words:
                    continue
                words = item.words
                if site not in words_list_websites:
                    words_list_websites[site] = words
                else:
                    words_list_websites[site] += words

        res = {"counted": {}, "sentiment": {}}
        for website in words_list_websites:
            plain_text_words = words_list_websites[website]
            counted_words = helper_word_counter(plain_text_words)
            res['counted'][website] = counted_words
            sentiment_intensity = helper_sentimement_analyser(plain_text_words)
            res['sentiment'][website] = sentiment_intensity        
        
        return make_response(jsonify(res), 200)
    except:
        return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)



# Database Routes
# change to /result
@routes.post('/result')
@jwt_required()
def add_frequency():
    print('adding word frequency')
    try: 
        current_user = get_jwt_identity()
        if 'word_frequencies_1' not in request.json:
            return make_response(jsonify({'error': "Missing intial website parameter (word_frequencies_1)"}), 400)
        word_frequencies_1 = str(request.json['word_frequencies_1'])
        print(request.json)
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
        w_f = WebsiteData(user_id=current_user, 
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
    except(TypeError):
        return make_response(jsonify({'error': "No JSON Supplied"}), 400)
    except(KeyError):
        return make_response(jsonify({'error': "Invalid JSON"}), 400)
    except:
        return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)

        
@routes.delete('/result/<int:result_id>')
@jwt_required()
def delete_word_frequency(result_id):
    try: 
        result = WebsiteData.query.filter_by(id=result_id).first()
        if not result:
            return make_response(jsonify({'error': "Error: Resource not found"}), 404)
        if result.user_id != get_jwt_identity():
            return make_response(jsonify({'error': "Error: Not authorized to delete this result"}), 401)
        db.session.delete(result)
        db.session.commit()
        return make_response(jsonify({'msg': 'Result deleted successfully'}), 201)
    except:
        return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)



@routes.get('/results')
@jwt_required()
def get_frequencies():
    try:
        current_user = get_jwt_identity()
        user_wf_items = WebsiteData.query.filter_by(user_id=current_user).all()
        res_data = []
        if len(user_wf_items) < 1:
            return make_response(jsonify({'results': res_data}))
        for item in user_wf_items:
            print(item.website_2)
            results_type = ''
            if item.website_2 == None:
                results_type = 'wf'
            else:
                results_type = 'wfc'
            res_item = {'id':item.id, 'created_at':item.updated_at, 'results_type':results_type}
            res_data.append(res_item)
        return make_response(jsonify({'results': res_data})), 200
    except:
        return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)









@routes.get('/result/<int:result_id>')
@jwt_required()
def get_saved_word_frequency(result_id):
    # try:

        wf = WebsiteData.query.filter_by(id=result_id).first()
        if not wf:
            return make_response(jsonify({'error': 'Resource does not exist'}), 400)
        # wf_list_1 = ast.literal_eval(wf.word_count_1)
        res = {"counted": {}, "uncounted": {}, "sentiment": {}}
        res["uncounted"][wf.website_1] = wf.word_count_1
        word_1_counted = helper_word_counter(wf.word_count_1)
        res["counted"][wf.website_1] = word_1_counted
        word_1_sentiment = helper_sentimement_analyser(wf.word_count_1)
        res['sentiment'][wf.website_1] = word_1_sentiment

        if wf.website_2:
            res["uncounted"][wf.website_2] = wf.word_count_2
            word_2_counted = helper_word_counter(wf.word_count_2)
            res["counted"][wf.website_2] = word_2_counted
            word_2_sentiment = helper_sentimement_analyser(wf.word_count_2)
            res['sentiment'][wf.website_2] = word_2_sentiment
        if wf.website_3:
            res["uncounted"][wf.website_3] = wf.word_count_3
            word_3_counted = helper_word_counter(wf.word_count_3)
            res["counted"][wf.website_3] = word_3_counted
            word_3_sentiment = helper_sentimement_analyser(wf.word_count_3)
            res['sentiment'][wf.website_3] = word_3_sentiment


        

        return make_response(jsonify(res), 200)


    # except:
    #     return make_response(jsonify({'error': 'Username does not exist'}), 400)



    
        

    
# Auth Routes

@auth.post('/sign-up')
def sign_up():
    try: 
        username=request.json['username']
        password=request.json['password']
        confirm_pass = request.json['confirm_password']
        if password != confirm_pass:
            return make_response(jsonify({'error': 'Passwords do not match'}), 400)        
        user = User.query.filter_by(username=username).first()
        if user:
            return make_response(jsonify({'error': 'Username already exists'}), 400)
        user = User(username, password)
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify({'msg': "Account Created Successfully"}), 201)

    except:
        return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)



@auth.post('/login')
def login():
    try: 
        username=request.json['username']
        password=request.json['password']
        user = User.query.filter_by(username=username).first()
        if user:
            if user.password_match(password):
                access_token = create_access_token(identity=user.id)
                refresh_token = create_refresh_token(identity=user.id)
                print("user logged in successfully")
                return make_response(jsonify({
                    'user':{
                        'access_token': access_token,
                        'refresh_token': refresh_token,
                        'username':user.username,
                        'msg': 'Sign In Successful'
                    },
                }), 200)
            else:
                return make_response(jsonify({'error': 'Login Information Incorrect'}), 401)
        else:
            return make_response(jsonify({'error': 'Username does not exist'}), 400)
    
    except(KeyError):
        return make_response(jsonify({'error': "Incorrect JSON"}), 400)
    except: 
        return make_response(jsonify({'error': "Internal server error. Something went wrong..."}), 500)



@auth.post("/refresh")
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)



