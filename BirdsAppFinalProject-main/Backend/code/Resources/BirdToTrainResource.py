from flask_restful import Resource, reqparse

from Models.BirdsToTrainModel import BirdsToTrainModel
from Utils.logger import logger


class BirdToTrainResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        'image_id',
        type=str
    )

    parser.add_argument(
        'user_id',
        type=int
    )

    parser.add_argument(
        'lat',
        type=float
    )

    parser.add_argument(
        'type',
        type=str
    )

    @staticmethod
    def post(bird_name):
        data = BirdToTrainResource.parser.parse_args()
        if data['image_id'] is None:
            return {'message': 'image_id is is missing.'}, 400

        if data['lat'] is None:
            return {'message': 'Location is missing.'}

        if data['lng'] is None:
            return {'message': 'Location is missing.'}

        bird_id = BirdsToTrainModel.generate_id()
        birds_to_train_model = BirdsToTrainModel(bird_id, bird_name, data['image_id'], data['user_id'], data['lat'],
                                                 data['lng'])
        try:
            birds_to_train_model.save_to_db()
            return {'message': 'Bird added successfully'}, 201

        except Exception as e:
            print(e)
            return {
                       'message': 'An error occurred adding the new bird.'
                   }, 500

    parser.add_argument(
        'lng',
        type=float,
        help='You must get your location')

    @staticmethod
    def get(bird_name):
        bird_model = BirdsToTrainModel.find_by_bird_name(bird_name)
        if bird_model:
            return bird_model.json()
        else:
            return {'message': 'No such bird exists'}

    @staticmethod
    def put(bird_name):
        data = BirdToTrainResource.parser.parse_args()
        bird_model = BirdsToTrainModel.find_by_bird_name(bird_name)
        if bird_model:
            if data['type'] is None:
                return
            bird_model.type = data['type']
            bird_model.isApproved = True
            bird_model.save_to_db()
