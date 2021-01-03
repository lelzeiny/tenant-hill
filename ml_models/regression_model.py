from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import explained_variance_score
import joblib
import numpy as np
import pandas as pd

def train(X, y):

    # 80-20 train test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    reg = LinearRegression(normalize=True)
    reg.fit(X_train, y_train)
    preds = reg.predict(X_test)
    var = explained_variance_score(y_test.to_numpy(), preds)
    print(f'Successfully trained model with a variance of {var:.2f}')

    return reg

if __name__ == '__main__':
    
    housing_data = pd.read_csv('ml_models/prediction_data.csv')
    housing_data = housing_data.set_index('address')
    X, y = housing_data.iloc[:,:-1], housing_data.iloc[:, -1]
    mdl = train(X, y)

    #serialize model
    joblib.dump(mdl, 'ml_models/housing.mdl')
    