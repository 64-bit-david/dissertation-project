from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    hashed_password = db.Column(db.String(100), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.hashed_password = generate_password_hash(password, 'sha256')

    def password_match(self, password):
        return check_password_hash(self.hashed_password, password)
        
        
class Word_Frequency(db.Model):
    __tablename__ = 'wordfrequency'
    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    website_1=db.Column(db.Text)
    word_count_1 = db.Column(db.JSON, nullable=True)
    website_2=db.Column(db.Text)
    word_count_2 = db.Column(db.JSON, nullable=True)
    website_3=db.Column(db.Text)
    word_count_3 = db.Column(db.JSON, nullable=True)
    updated_at=db.Column(db.DateTime)


class HourlyWordFrequency(db.Model):
   __tablename__ = 'wf24'
   id = db.Column(db.Integer, primary_key=True)
   website=db.Column(db.String(length=100))
   word_frequency = db.Column(db.JSON, nullable=True)
   updated_at= db.Column(db.TIMESTAMP, nullable=True)
   hour = db.Column(db.Integer)

    



