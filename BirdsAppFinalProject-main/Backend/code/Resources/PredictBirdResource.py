import logging
from flask_restful import Resource, reqparse
from Resources.AWS.Bucket import Bucket
import numpy as np
from tensorflow import keras
import cv2


class PredictBirdResource(Resource):
    bird_dict = ['American Pipit', 'Eurasian Collared-Dove', 'House Sparrow', 'European Starling', 'Gadwall',
                 'Rock Pigeon']

    size = (224, 224)

    parser = reqparse.RequestParser()
    parser.add_argument(
        'bird_info',
        type=str,
        required=False
    )

    def get(self, img_name):  # Recognize the Bird!
        img_str = Bucket.get_bird_from_s3(img_name)
        img = cv2.imdecode(np.fromstring(img_str, np.uint8), cv2.IMREAD_COLOR)
        # Model choose and upload
        model = keras.models.load_model('./vgg2.h5')
        # Image
        # img = np.array(Image.open(img))
        # img = np.array(img)
        img = cv2.resize(img, self.size)
        img = np.expand_dims(img, axis=0)
        # run model
        res = self.bird_dict[np.argmax(model.predict(img))]
        logging.Logger(f'Recognize bird {res}, image name = ${img_name}')
        return {'message': f'{res}'}
