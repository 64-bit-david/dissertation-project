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
        self.hashed_password = check_password_hash(password)
        


class Word_Frequency(db.Model):
    __tablename__ = 'wordfrequency'
    id = db.Column(db.Integer, primary_key=True)
    compare_id = db.Column(db.Integer)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    website_1=db.Column(db.Text)
    word_count_1 = db.Column(db.Text, nullable=True)
    updated_at=db.Column(db.DateTime)
    website_2=db.Column(db.Text)
    word_count_2 = db.Column(db.Text, nullable=True)
    website_3=db.Column(db.Text)
    word_count_3 = db.Column(db.Text, nullable=True)