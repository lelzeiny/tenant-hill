from flask import Flask
from flask_restful import Api, Resource, reqparse
import joblib
import numpy as np

APP = Flask(__name__)
API = Api(APP)

HOUSING_MODEL = joblib.load('housing.mdl') 

class Predict(Resource):

    @staticmethod
    def post():
        parser = reqparse.RequestParser()
        parser.add_argument('num_rooms')
        parser.add_argument('num_bathrooms')
        parser.add_argument('wifi')
        parser.add_argument('sq_ft')

        args = parser.parse_args()  # creates dict

        X_new = np.fromiter(args.values(), dtype=float)  # convert input to array

        out = {'Prediction': HOUSING_MODEL.predict([X_new])[0]}

        return out, 200


API.add_resource(Predict, '/predict')

if __name__ == '__main__':
    APP.run(debug=True, port='1080')

# bathrooms, square feet, wifi (y/n), near market, price
