from flask_restful import Resource, reqparse
from Models.UserModel import UserModel
from Utils.logger import logger


class UserLoginResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        'password',
        type=str,
        required=True,
        help='Password filed cannot be blank'
    )

    @staticmethod
    def post(username):
        user = UserModel.find_by_username(username)
        print(user)
        data = UserLoginResource.parser.parse_args()
        if user:
            if user.password == data['password']:
                print(user.password)
                logger.info(f'User {username} logged in')
                return {'username': user.username, 'user_type': UserModel.get_user_type(user.user_type)}, 200
            else:
                return {'message: wrong password'}
        else:
            logger.info(f'Failed to find {username}')
            return {'message': 'User cannot be found'}, 403
