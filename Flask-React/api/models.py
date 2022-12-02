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
        
        
class WebsiteData(db.Model):
    __tablename__ = 'website_data'
    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    website_1=db.Column(db.Text)
    word_count_1 = db.Column(db.Text, nullable=True)
    website_2=db.Column(db.Text)
    word_count_2 = db.Column(db.Text, nullable=True)
    website_3=db.Column(db.Text)
    word_count_3 = db.Column(db.Text, nullable=True)
    updated_at=db.Column(db.DateTime)


class WebsiteData24(db.Model):
   __tablename__ = 'website_data_24'
   id = db.Column(db.Integer, primary_key=True)
   website=db.Column(db.String(length=100))
   words = db.Column(db.Text, nullable=True)
   updated_at= db.Column(db.TIMESTAMP, nullable=True)
   updated_at= db.Column(db.TIMESTAMP, nullable=False, server_default=db.text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
   hour = db.Column(db.Integer)



