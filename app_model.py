import pickle

class AppModel:
    def __init__(self, model_path):
        with open(model_path, "rb") as file:

            self.model = pickle.load(file)

    def predict(self, features):
        prediction = self.model.predict([features])[0]
        probability = max(self.model.predict_proba([features])[0])
        return {"prediction": prediction, "probability": probability}
