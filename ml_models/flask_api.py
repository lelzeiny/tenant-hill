from flask import Flask
from flask_restful import Api, Resource, reqparse
import joblib
import numpy as np
import pandas as pd

APP = Flask(__name__)
API = Api(APP)

HOUSING_MODEL = joblib.load('ml_models/housing.mdl') 

class Predict(Resource):

    @staticmethod
    def post():
        parser = reqparse.RequestParser()
        parser.add_argument('address')
        parser.add_argument('zipcode')
        parser.add_argument('beds')
        parser.add_argument('dog')
        parser.add_argument('cat')
        parser.add_argument('dishwasher')
        parser.add_argument('ac')
        parser.add_argument('laundry')
        parser.add_argument('parking')
        parser.add_argument('gym')
        parser.add_argument('price')


        args = parser.parse_args()  # creates dict

        print(args)
        print(list(args.values()))

        # converts Yes and No to 1 and 0 for prediction
        temp = pd.DataFrame(list(args.values())[1:10])
        temp = temp.replace(["Yes", "No"], ['1', '0'])
        temp = temp.replace(["TRUE", "FALSE"], ['1', '0'])

        X_new = np.fromiter(temp[0].to_list(), dtype=float)  # convert input to array

        predicted_price = HOUSING_MODEL.predict([X_new])[0]
        actual_price = float(list(args.values())[-1])
        rating = 1
        if (predicted_price < actual_price):
            error = (abs(predicted_price - actual_price) / abs(actual_price))
            rating = 1 - error

        out = {'Estimated Price': predicted_price, 'Rating': rating * 100}

        return out, 200


API.add_resource(Predict, '/predict')

if __name__ == '__main__':
    APP.run(debug=True, port='1080')

