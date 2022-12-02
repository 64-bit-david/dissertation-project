import unittest
import TimedTrigger
from TimedTrigger import models
from sqlalchemy import create_engine
from sqlalchemy.orm import Session


class MockTimerRequest():
    """
    A class to allow a timed Azure function to be tested.
    """
    def __init__(self):
        self.past_due = True


class TestTimedTrigger(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        TimedTrigger.__test_db_engine__ = create_engine("sqlite+pysqlite:///:memory:", echo=True, future=True)

    # def test_something(self):
    #     # Run the function.
    #     timer_request = MockTimerRequest()
    #     TimedTrigger.main(timer_request)

    #     # Check the database content.
    #     session = Session(TimedTrigger.__test_db_engine__)
    #     template_data = session.query(models.WebsiteData24).all()
    #     self.assertEqual(len(template_data), 144)
   

# 
# NEED TO FIGURE OUT HOW TO PASS ENGINE TO TEST!!!
# 
    def test_db_init(self):
        session = Session(TimedTrigger.__test_db_engine__)
        TimedTrigger.init_db(session, ["0", "1", "2", "3", "4", "5"])
        template_data = session.query(models.WebsiteData24).all()
        self.assertEqual(len(template_data), 144)
     
    # def test_db(self):
    #     session = Session(TimedTrigger.__test_db_engine__)
    #     template_data = session.query(models.WebsiteData24).all()
    #     self.assertEqual(len(template_data), 0)