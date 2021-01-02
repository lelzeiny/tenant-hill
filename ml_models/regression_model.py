from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import accuracy_score
import joblib
import numpy as np

def train(X, y):

    # 80-20 train test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    reg = LinearRegression()
    reg.fit(X_train, y_train)
    preds = reg.predict(X_test)
    acc = accuracy_score(y_test, preds)
    print(f'Successfully trained model with an accuracy of {acc:.2f}')

    return reg

if __name__ == '__main__':
    
    housing_data = ...
    X = housing_data['data']
    y = housing_data['target']
    labels = {} # for changing non-numerical values to numbers (i.e. changing Wifi (Yes) to Wifi (1) )


    y = np.vectorize(labels.__getitem__)(y)
    mdl = train(X, y)

    #serialize model
    joblib.dump(mdl, 'housing.mdl')
    