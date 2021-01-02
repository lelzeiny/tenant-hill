from flask import Flask
from flask_restful import Api, Resource, reqparse
import joblib
import numpy as np
import pandas as pd

APP = Flask(__name__)
API = Api(APP)

HOUSING_MODEL = joblib.load('housing.mdl') 

class Predict(Resource):

    @staticmethod
    def post():
        parser = reqparse.RequestParser()
        parser.add_argument('address')
        parser.add_argument('wifi')
        parser.add_argument('laundry')
        parser.add_argument('sqft')
        parser.add_argument('price')

        args = parser.parse_args()  # creates dict

        # converts Yes and No to 1 and 0 for prediction
        temp = pd.DataFrame(list(args.values())[1:4])
        temp = temp.replace(['Yes', 'No'], ['1', '0'])

        X_new = np.fromiter(temp[0].to_list(), dtype=float)  # convert input to array
        out = {'Estimated Price': HOUSING_MODEL.predict([X_new])[0]}

        return out, 200


API.add_resource(Predict, '/predict')

if __name__ == '__main__':
    APP.run(debug=True, port='1080')

