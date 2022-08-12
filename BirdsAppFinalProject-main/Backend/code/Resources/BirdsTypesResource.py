from flask_restful import Resource, reqparse
from Models.BirdInfoModel import BirdInfoModel


class BirdsTypesResource(Resource):

    @staticmethod
    def get():
        return BirdInfoModel.get_all_birds_types()
