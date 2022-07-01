import logging

import azure.functions as func
from headless_chrome import headless_chrome
from news_site_scrape_data import news_site_scrape_data
from bs4 import BeautifulSoup
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from collections import Counter
import json





def fetch_html(url):
    """
    A function that returns the html of a webpage using headless chrome
    """


    chrome = headless_chrome.HeadlessChrome()

    page_source = chrome.get(url)
    print('----------------------------------------------')
    print('ABOVE IS UNSTOPPABLE')
    with open('page_markup.html', 'w', encoding='utf-8') as file:
        file.write(page_source)

    chrome.quit()

    return page_source




def get_header_tags(web_page_markup, site_name):
    """
    A function that takes web page mark up and extracts headline text by given attributes
    and combines them into one string 
    """
    soup = BeautifulSoup(web_page_markup, 'lxml')


    # soup = soup.prettify()
    # soup = BeautifulSoup(soup, 'lxml')
  
    # first attempt was to filter out what we didn't want
        #too difficult, decided better approach is to filter in by class/id
    # for id_key, id_value in n_sites.non_important_elements[site_name].items():
    #     for div in soup.find_all("div", {id_key:id_value}): 
    #         div.decompose()


   
    stories_text = ''
    for item in news_site_scrape_data.relevant_elements[site_name]:
        id_attr = item.split(' ')[0]
        id_value = item.split(' ')[1]

        headline_elements = soup.find_all(attrs={id_attr, id_value})
        for headline in headline_elements:
            stories_text += headline.text + " "
            # print(headline)
    
    return stories_text




def headline_filter(headlines):
    """
    A function that removes stopwords from a given string of many words
    """
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(headlines)

    filtered_words = ""

    for w in word_tokens:
        if w not in stop_words and w.isalpha() and len(w) > 2:
            filtered_words = filtered_words + w.lower() + " "
    return filtered_words



def word_counter(text):
    """
    A function that counts the frequency of each word in a string  
    """


    tokens = [t for t in text.split()]
    counts = Counter(tokens)
    #Needs to be in this format for react word cloud module to work
    result = [{'value': key, 'count': count} for key, count in counts.most_common(50)]
    result = json.dumps(result)
    return result




def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    website = req.params['website']
    markup = fetch_html(news_site_scrape_data.websites[website])
    headlines = get_header_tags(markup, website)
    filtered_headlines = headline_filter(headlines)
    counted_words = word_counter(filtered_headlines)

    return func.HttpResponse(counted_words)







    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        return func.HttpResponse(f"Hello, {name}. This HTTP triggered function executed successfully.")
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
             status_code=200
        )
