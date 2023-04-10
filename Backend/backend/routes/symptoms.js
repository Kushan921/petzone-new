const express = require("express");
const bodyParser = require("body-parser");
const router = require("express").Router();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const symptomsDB = [
  {
    name: "Malaria",
    symptoms: ["Fever", "Chills", "Headache", "Fatigue", "Nausea"],
  },
  {
    name: "Tuberculosis",
    symptoms: ["Cough", "Fatigue", "Fever", "Night sweats"],
  },
  {
    name: "Migraine",
    symptoms: ["Headache", "Nausea", "Sensitivity to light and sound"],
  },
  {
    name: "Stomach flu",
    symptoms: ["Nausea", "Vomiting", "Diarrhea", "Abdominal pain"],
  },
  {
    name: "Gastroenteritis",
    symptoms: ["Diarrhea", "Abdominal pain", "Nausea", "Vomiting", "Fever"],
  },
  {
    name: "Appendicitis",
    symptoms: [
      "Abdominal pain",
      "Fever",
      "Nausea",
      "Vomiting",
      "Loss of appetite",
    ],
  },
  {
    name: "Bird flu",
    symptoms: [
      "Fever",
      "Sore throat",
      "Cough",
      "Headache",
      "Muscle pain",
      "Hard breathing",
    ],
  },
];


router.route("/search").post((req, res) => {
  const symptoms = req.body.symptoms;

  // search symptom database for matching diseases
  const matchingDiseases = symptomsDB
    .filter((disease) => {
      return disease.symptoms.every((symptom) => symptoms.includes(symptom));
    })
    .map((disease) => disease.name);

  res.json({ diseases: matchingDiseases });
});


module.exports = router;
