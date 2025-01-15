from flask import Flask, request, jsonify

from app_model import AppModel


# Initialisation de l'application Flask
app = Flask(__name__)

# Chargement du modèle
model = AppModel(model_path="credit_risk_model.pkl")

# Liste des caractéristiques attendues
EXPECTED_FEATURES = [
    "person_age",
    "person_income",
    "person_home_ownership",
    "person_emp_length",
    "loan_intent",
    "loan_grade",
    "loan_amnt",
    "loan_int_rate",
    "loan_percent_income",
    "cb_person_default_on_file",
    "cb_person_cred_hist_length"
]

# Mapping pour les valeurs catégoriques
CATEGORY_MAPPINGS = {
    "person_home_ownership": {"RENT": 0, "OWN": 1, "MORTGAGE": 2, "OTHER": 3},
    "loan_intent": {"EDUCATION": 0, "MEDICAL": 1, "VENTURE": 2, "PERSONAL": 3, "DEBTCONSOLIDATION": 4, "HOMEIMPROVEMENT": 5},
    "loan_grade": {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6},
    "cb_person_default_on_file": {"N": 0, "Y": 1}
}

def preprocess_features(data):
    processed_data = []
    for feature in EXPECTED_FEATURES:
        value = data.get(feature)
        if feature in CATEGORY_MAPPINGS:
            value = CATEGORY_MAPPINGS[feature].get(value, -1)
        processed_data.append(value)
    return processed_data

@app.route("/")
def index():
    return jsonify({"message": "Service de prédiction de risque de crédit actif."})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        missing_features = [f for f in EXPECTED_FEATURES if f not in data]
        if missing_features:
            return jsonify({
                "error": "Données manquantes.",
                "missing_features": missing_features
            }), 400

        features = preprocess_features(data)
        result = model.predict(features)
        result_text = "Risque élevé" if result["prediction"] == 1 else "Risque faible"

        return jsonify({
            "prediction": result_text,
            "probability": result["probability"],
            "status": "success"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
