import azure.functions as func
import datetime
import logging
from . import models
from .websites import websites
import os
import sqlalchemy
from sqlalchemy.orm import Session
import json
import requests

# Needed to override the connection string for testing.
__test_db_engine__ = None


def database_uri() -> str:
    """
    A function to build the database connection string, using environment
    variable settings.
    """

    # If the connection string has been given, use it.
    url = os.environ.get("DB_CONNECTION_STRING", default="")
    if len(url) != 0:
        return url

    url = sqlalchemy.engine.url.URL.create(
        drivername = "mariadb+mariadbconnector",
        username = os.environ.get("DB_USER", default="none"),
        password = os.environ.get("DB_PASSWORD", default="none"),
        host = os.environ.get("DB_SERVER", default="127.0.0.1"),
        port = os.environ.get("DB_PORT", default="3306"),
        database = os.environ.get("DB_NAME", default="mydb"))
    return str(url)


def init_db(session, list_of_websites):
   
        """
        A function to populate an empty table from a list of websites, each entry represents
        an hour of the day for that website
        """
        for website in list_of_websites:
                for i in range(0, 24):
                    template_row = models.HourlyWordFrequency(
                        website=website,
                        # word_frequency = "",
                        hour = i
                    )
                    session.add(template_row)
                    session.commit()


def get_num_of_rows_in_table(session):
        return session.query(models.HourlyWordFrequency.website).count()

def update_db(session):
        """
        A function that updates the database with word frequencies for the present hour
        """
        if get_num_of_rows_in_table(session) == 0:
            logging.info('No data, inserting website data...')
            init_db(session, websites.websites)
        
        current_hour = datetime.datetime.now().hour

        # fetch data
        logging.info('Calling HTTP Trigger Function....')
        res = json.loads(get_word_frequencies())

        for website in websites.websites:
            updateWordFrequency(session, current_hour, website, wf_data=res[website])
        logging.info('Word Frequency data added to database')



def get_word_frequencies():
        """
        A function to fetch the word frequency data from the webscraper / httptrigger function
        """
        data = requests.get(' http://localhost:7071/api/HttpTrigger?websites=bbc&websites=cnn&websites=fox&websites=msnbc&websites=guardian&websites=daily_mail')
        # data = requests.get(' http://localhost:7071/api/HttpTrigger?websites=bbc')
        return data.text


def updateWordFrequency(session, hour, website, wf_data):
        session.query(models.HourlyWordFrequency).filter(models.HourlyWordFrequency.hour==hour, models.HourlyWordFrequency.website==website).update({'word_frequency': wf_data})
        session.commit() 
        logging.info('data added')



def main(mytimer: func.TimerRequest) -> None:
    utc_timestamp = datetime.datetime.utcnow().replace(
        tzinfo=datetime.timezone.utc).isoformat()
    
        # Get or create an engine.
    if __test_db_engine__ is not None:
        engine = __test_db_engine__
    else:
        # Get the connection variables and SSL certificate if it has been provided.
        connection_string = database_uri()
        ssl_cert = os.environ.get("DB_SSL_CERT", default=None)
        connection_args = {}
        if ssl_cert is not None:
            connection_args["ssl_ca"] = ssl_cert
        engine = sqlalchemy.create_engine(connection_string, connect_args=connection_args, echo=False, future=True)

    models.Base.metadata.create_all(engine)
    session = Session(engine)

    # Record the state.
    update_db(session)    

    logging.info('Python timer trigger function ran at %s', utc_timestamp)
