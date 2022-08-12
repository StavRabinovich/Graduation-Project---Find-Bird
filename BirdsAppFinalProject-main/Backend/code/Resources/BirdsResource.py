from flask_restful import Resource
from Models.BirdsToTrainModel import BirdsToTrainModel
from flask import jsonify


class BirdsResource(Resource):

    @staticmethod
    def get():
        return [bird.json() for bird in BirdsToTrainModel.get_all_birds()]
