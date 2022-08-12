from db import db


class BirdsLocationModel(db.Model):
    index = None
    __tablename__ = 'birds_location'
    bird_id = db.Column('bird_id', db.Integer, primary_key=True)  # Id for current bird
    bird_name = db.Column('bird_name', db.String(30))
    bird_family = db.Column('bird_family', db.String(30))
    image_path = db.Column('image_path', db.String(300))
    lat = db.Column('lat', db.Float(precision=10, decimal_return_scale=None))
    lng = db.Column('lng', db.Float(precision=10, decimal_return_scale=None))

    # TODO: Add date, add user_id
    # TODO: get username by user_id

    def __init__(self, bird_id, bird_name, bird_family, image_path, lat, lng):
        self.bird_id = bird_id
        self.bird_name = bird_name
        self.bird_family = bird_family
        self.image_path = image_path
        self.lat = lat
        self.lng = lng

    def json(self):
        return {'bird_id': self.bird_id, 'bird_name': self.bird_name, 'bird_family': self.bird_family,
                'image_path': self.image_path, 'lat': self.lat, 'lng': self.lng}

    @classmethod
    def find_by_bird_name(cls, bird_name):
        return cls.query.filter_by(bird_name=bird_name).first()

    @classmethod
    def find_by_bird_id(cls, bird_id):
        return cls.query.filter_by(bird_id=bird_id).first()

    @classmethod
    def get_all_birds_locations(cls):
        return cls.query.all()

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
            user = cls.query.order_by(BirdsLocationModel.user_id.desc()).first()
            cls.index = user.user_id + 1 if user else 1
        return cls.index

    # Will return the most closest birds to the location
    @classmethod
    def find_closest_birds(cls, amount=3):
        pass
