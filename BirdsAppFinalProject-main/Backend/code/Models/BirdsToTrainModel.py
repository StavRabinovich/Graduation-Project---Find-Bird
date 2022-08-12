from db import db
from Resources.AWS.Bucket import Bucket


class BirdsToTrainModel(db.Model):
    index = None
    __tablename__ = 'birds_to_train'
    bird_id = db.Column('bird_id', db.Integer, primary_key=True)
    bird_name = db.Column('bird_name', db.String(30))
    image_id = db.Column('image_id', db.String(30))
    user_id = db.Column('user_id', db.Integer)  # Took the photo
    isApproved = db.Column('isApproved', db.Boolean)  # If a bird watcher approved the algorithm
    lat = db.Column('lat', db.Float(precision=10, decimal_return_scale=None))
    lng = db.Column('lng', db.Float(precision=10, decimal_return_scale=None))
    type = db.Column('type', db.String(30))

    def __init__(self, bird_id, bird_name, image_id, user_id, lat, lng):
        self.bird_id = bird_id
        self.bird_name = bird_name
        self.image_id = image_id
        self.user_id = user_id
        self.lat = lat
        self.lng = lng
        self.isApproved = 0
        self.type = None

    @classmethod
    def find_by_id(cls, bird_id):
        return cls.query.filter_by(bird_id=bird_id).first()

    @classmethod
    def get_all_birds_to_train(cls):
        return cls.query.all()

    @classmethod
    def find_by_bird_name(cls, bird_name):
        return cls.query.filter_by(bird_name=bird_name).limit(1).first()

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
            user = cls.query.order_by(BirdsToTrainModel.bird_id.desc()).first()
            cls.index = user.user_id + 1 if user else 1
        return cls.index

    @classmethod
    def get_bird_to_define(cls):
        try:
            bird_id = cls.query().filter_by(BirdsToTrainModel.isApproved is False).first()
            if bird_id:
                return bird_id
            else:
                return {'message': 'There is no birds to define.'}, 400

        except:
            return {'message': 'Failed to get birds to define'}, 500

    @classmethod
    def get_all_birds(cls):
        return cls.query.filter_by(isApproved=True).all()

    def json(self):
        return {
            'bird_id': self.bird_id,
            'bird_name': self.bird_name,
            'image_id': self.image_id,
            'user_id': self.user_id,
            'lat': self.lat,
            'lng': self.lng,
            'isApproved': self.isApproved,
            'type': self.type
        }
