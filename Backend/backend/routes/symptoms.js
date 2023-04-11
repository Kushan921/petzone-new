const express = require("express");
const bodyParser = require("body-parser");
const router = require("express").Router();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const symptomsDB = [
  {
    name: "Bird Flu",
    symptoms: ["Fever", "Sore_throat", "Cough", "Headache", "Muscle_pain", "Hard_breathing"],
  },
  {
    name: "Valley fever",
    symptoms: ["Dry_cough", "Fever", "Lack_of_appetite", "Depression"],
  },
  {
    name: "Tuberculosis",
    symptoms: ["Weight_loss", "Fever", "Coughing"],
  },
  {
    name: "Parvovirus",
    symptoms: ["Vomiting", "Diarrhea", "Fever", "Lethargy", "Loss_of_appetite", "Dehydration"],
  },
  {
    name: "Distemper",
    symptoms: ["Sneezing", "Coughing", "Fever", "Vomiting", "Diarrhea", "Seizures", "Paralysis"],
  },
  {
    name: "Lyme Disease",
    symptoms: [ "Lameness", "Joint swelling", "Fever", "Fatigue", "Loss_of_appetite", "Depression"],
  },
  {
    name: "Newcastle",
    symptoms: [ "Sneezing", "Nasal_discharge", "Cough", "Diarrhea", "Shudder", "Drooping_wings", "Paralysis", "Swelling_of_the_tissues_around_the_eyes_and_the_neck", "suddenly_death",  "Reduction_in_production"],
  },
  {
    name: "Infectious Coryza",
    symptoms: ["Swollen_head_or_face", "Sneezing", "Cough", "Eye_secretions", "Nasal_discharge", "Anorexia", "Hard_breathing"],
  },
  {
    name: "Thrush",
    symptoms: ["Anorexia", "Oral_lesions", "Slow_growth", "Scaly_eyes", "Drooping_wings", "Hard_breathing "],
  },
  {
    name: "Mastitis",
    symptoms: ["Abnormal_size_and_hardness_of_the udder", "Fever"],
  },
  {
    name: "Tuberculosis",
    symptoms: ["Abscess", "Cough", "Swollen_lymph_nodes", "Increased_heart_rate."],
  },
  {
    name: "Bloat",
    symptoms: ["Flatulence", "Excess_salivation", "Whining", "Anorexia", "Vomiting"],
  },
  {
    name: "Equine encephalomyelitis ",
    symptoms: [ "Fever", "Double_vision", "Irregular_gait", "Shudder", "Oral_lesions", "Walks_aimlessly."],
  },
  {
    name: "Hemorrhagic septicemia ",
    symptoms: [ "Fever", "Hard_breathing", "Cough", "Eye_secretions", "Nasal_discharge."],
  },
  {
    name: "Brucellosis",
    symptoms: ["Swelling_of_the_testicles_in_males and occasionally the bacteria localizes in the joints causing arthritis", "Fever", "Shudder", "Anorexia", "Sweating", "Lethargy",  "Muscle_pain in the joints", "muscles and, back, Headache."],
  },
  {
    name: "Canine Influenza	",
    symptoms: ["Coughing", "Sneezing", "Fever", "Lethargy", "Loss of appetite", "Nasal discharge"],
  },
  {
    name: "Pneumonia",
    symptoms: ["Fever", "Anorexia", "Hard_breathing", "Eye_secretions", "Nasal_discharge", "Excess_salivation", "Diarrhea."],
  },
  {
    name: "Foot and mouth disease (FMD)",
    symptoms: ["Fever", "Skin_lesions","Damage_Skin", "Hard_breathing", "Excess_salivation", "Oral_lesions."],
  },
  {
    name: "Bluetongue",
    symptoms: ["Fever", "Oral_lesions", "Hard_breathing", "Purple-coloured_tongue", "Lameness"],
  },
  {
    name: "Anaplasmosis ",
    symptoms: [ "Fever", "Pale_around_eyes", "Lethargy", "Weight_loss", "Reduction_in_production", "Aggressive_behaviour."],
  },
  {
    name: "Rabies",
    symptoms: [ "Anorexia", "Pruritus", "Lameness", "Tenesmus", "Excess_salivation", "Aggressive_behaviour."],
  },
  {
    name: "Necrotic enteritis",
    symptoms: ["Anorexia", "Lethargy", "Fluffy_feathers", "Eyes_closed", "Diarrhea."],
  },
  {
    name: "Ascarids",
    symptoms: ["Anorexia", "Diarrhea", "Slow_growth", "Lethargy", "Ruffled_feathers", "Weight_loss", "changes_in_behaviour."],
  },
  {
    name: "Avian Pox",
    symptoms: ["Swollen_eyelids", "Eyes_closed", "Oral_lesions", "Weight_loss", "Anorexia."],
  },
  {
    name: "Kennel Cough",
    symptoms: ["Coughing", "Gagging", "Retching", "Fever", "Nasal_discharge", "Lethargy"],
  },
  {
    name: "Heartworm Disease",
    symptoms: ["Coughing", "Fatigue", "Weight_loss", "Difficulty_breathing", "Collapse"],
  },
  {
    name: "Leptospirosis",
    symptoms: [ "Vomiting", "Diarrhea", "Fever", "Abdominal_pain", "Muscle_pain", "Kidney_failure"],
  },
  {
    name: "Rabies",
    symptoms: ["Behavior_changes", "Aggression", "Fever", "Seizures", "Paralysis", "Foaming_at_the_mouth"],
  },
  {
    name: "Canine Coronavirus",
    symptoms: ["Vomiting", "Diarrhea", 'Fever', "Loss_of_appetite", "Lethargy"],
  },
  {
    name: "Canine Hepatitis",
    symptoms: ["Fever", "Coughing", "Abdominal_pain", "Vomiting", "Diarrhea, Jaundice"],
  },
  {
    name: "Oral Infections",
    symptoms: ["Recurring_bad_breath", "Jaw_pain", "Loose_teeth", "Sores_in_the_mouth"],
  },
  {
    name: "Ear Infections",
    symptoms: [" High_temperature", "Difficulty_hearing", "Itching_and_irritation"],
  },
  {
    name: "Urinary Tract Problems",
    symptoms: ["Frequent_urination", "Breaking_housetraining", "Blood_in_the_urine", "Dribbling_urine", "Crying_out_while_urinating"],
  }
];


router.route("/search").post((req, res) => {
  const name = req.body.name;
  const age = req.body.age;
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