from flask_restful import Resource, reqparse
from Utils.logger import logger
from Models.BirdInfoModel import BirdInfoModel


class BirdInfoResource(Resource):
    parser = reqparse.RequestParser()

    parser.add_argument(
        'bird_info',
        type=str,
        required=True,
        help='You must provide bird_info'
    )

    @staticmethod
    def get(bird_name):
        # try:
        bird = BirdInfoModel.find_by_bird_name(bird_name)
        if bird:
            return bird.json()
        else:
            return {'message': f'Bird named {bird_name} does not exists'}, 200

        # except:
        #     return {"message": "Failed to find the BirdInfo"}, 500

    @staticmethod
    def post(bird_name):
        try:
            if BirdInfoModel.find_by_bird_name(bird_name):
                return {'message': 'Bird with this name already exists'}
        except:
            return {
                       'message': 'An error occurred adding the new bird.'
                   }, 500

        data = BirdInfoResource.parser.parse_args()

        if 'bird_info' not in data or data['bird_info'] is None:
            return {'message': 'You must fill the bird_info failed.'}

        bird_info = data['bird_info']

        bird = BirdInfoModel(bird_name, bird_info)

        try:
            bird.save_to_db()
            logger.debug(f'Added BirdInfo : {bird.json()}')

        except:
            return {
                       'message': 'An error occurred saving the BirdInfo'
                   }, 500

        return bird.json(), 201

    @staticmethod
    def delete(bird_name):
        if bird_name:
            bird = BirdInfoModel.find_by_bird_name(bird_name)
            if bird:
                bird.delete_from_db()
                return {'message': 'Bird deleted from db.'}
            return {
                'message': 'No such bird exists with this name.'
            }
