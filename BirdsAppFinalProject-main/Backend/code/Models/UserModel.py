from db import db
from Utils.Enums import USER_TYPE
from Utils.logger import logger


class UserModel(db.Model):
    index = None
    __tablename__ = 'users'
    user_id = db.Column('user_id', db.Integer, primary_key=True)
    username = db.Column('username', db.String(20), unique=True)
    first_name = db.Column('first_name', db.String(20))
    last_name = db.Column('last_name', db.String(20))
    password = db.Column('password', db.String(16))
    email = db.Column('email', db.String(30), unique=True)
    user_type = db.Column('user_type', db.Integer)

    def __init__(self, user_id, username, first_name, last_name, email, password, user_type):
        self.user_id = user_id
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.user_type = user_type

    def json(self):
        return {
            'username': self.username,
            'user_id': self.user_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'user_type': USER_TYPE(self.user_type).name,
            'password': self.password
        }

    @classmethod
    def get_user_type(cls, user_type):
        return USER_TYPE(user_type).name

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def generate_id(cls):
        if cls.index:
            cls.index += 1
        else:
            user = cls.query.order_by(UserModel.user_id.desc()).first()
            cls.index = user.user_id + 1 if user else 1
        return cls.index
