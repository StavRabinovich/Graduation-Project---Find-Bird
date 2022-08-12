from flask_restful import Resource, reqparse

from Models.UserModel import UserModel
from Utils.logger import logger
from Utils.Enums import USER_TYPE


class UserResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        'first_name',
        type=str,
        help='first_name field cannot be blank'
    )

    parser.add_argument(
        'last_name',
        type=str,
        help='last_name field cannot be blank'
    )

    parser.add_argument(
        'email',
        type=str,
        help='email field cannot be blank'
    )

    parser.add_argument(
        'password',
        type=str,
        help='password field cannot be blank'
    )
    parser.add_argument(
        'user_type',
        type=str,
        help='user_type field cannot be blank'
    )

    @staticmethod
    def get(username):
        user_model = UserModel.find_by_username(username)
        if user_model:
            return user_model.json()
        else:
            return {'message': 'No such User exists'}

    @staticmethod
    def post(username):
        if UserModel.find_by_username(username):
            return {'message': 'Username already exists'}, 400
        data = UserResource.parser.parse_args()
        print(data)
        # Check if email is given and not taken
        if 'email' in data:
            if UserModel.find_by_email(email=data['email']):
                return {'message': 'Email is already taken'}, 400
            if data['email'] == '':
                return {'message': 'Email cannot be empty'}, 400
        else:
            return {'message': 'email is a required filed'}, 400

        if 'first_name' not in data:
            return {'message': 'first_name is a required filed'}, 400

        if data['first_name'] == '':
            return {'message': 'First name cannot be empty'}, 400

        if 'last_name' not in data:
            return {'message': 'last_name is a required filed'}, 400

        if data['last_name'] == '':
            return {'message': 'Last name cannot be empty'}, 400

        if 'password' not in data:
            return {'message': 'Password is a required filed'}, 400

        if data['password'] == '':
            return {'message': 'Password cannot be empty'}, 400

        if 'user_type' not in data:
            return {'message': 'user_type is a required filed'}, 400

        if data['user_type'] == '':
            return {'message': 'role cannot be empty'}, 400

        user_id = UserModel.generate_id()
        user_model = UserModel(user_id, username, **data)
        try:
            user_model.save_to_db()
            logger.debug(f'Added user : {user_model.json}')
        except:
            return {
                       'message': 'An error occurred adding the new user.'
                   }, 500
        return user_model.json(), 201

    @staticmethod
    def delete(username):
        if username:
            user = UserModel.find_by_username(username)
            if user:
                user.delete_from_db()
                return {'message': 'User deleted from db'}
            return {
                'message': 'No such User exists with this username'
            }

    @staticmethod
    def put(username):
        user_model = UserModel.find_by_username(username)
        if user_model:
            data = UserResource.parser.parse_args()
            if 'first_name' in data and data['first_name'] is not None:
                UserModel.first_name = data['first_name']

            if 'last_name' in data and data['last_name'] is not None:
                UserModel.last_name = data['last_name']

            if 'email' in data:
                other = UserModel.find_by_email(email=data['email'])
                if other and other.user_id != user_model.user_id:
                    return {'message': 'Email is already taken'}, 400

                if data['email'] == '':
                    return {'message': 'Email cannot be empty'}, 400
            user_model.email = data['email']

            if 'password' in data and data['password'] is not None:
                user_model.password = data['password']
            user_model.user_type = data['user_type']
            user_model.save_to_db()
        else:
            return {'message': "No user found."}, 400
        return user_model.json(), 200
