const router = require("express").Router();
const { request } = require("express");
let Reservation = require("../models/reservationModel");
const MongoClient = require("mongodb").MongoClient;
const nodemailer = require("nodemailer");
const uri =
  "mongodb+srv://kushan:Dphy8UxCjDyMC9RJ@cluster0.jjquq5c.mongodb.net/?retryWrites=true&w=majority";

//Add Reservation
//http://localhost:8050/reservation/add
router.route("/add").post((req, res) => {
  const First_name = req.body.First_name;
  const Last_name = req.body.Last_name;
  const Contact = req.body.Contact;
  const Email = req.body.Email;
  const Address = req.body.Address;
  const City = req.body.City;
  const Starting_date = req.body.Starting_date;
  const Ending_date = req.body.Ending_date;
  const No_of_Days = req.body.No_of_Days;
  const No_of_Nights = req.body.No_of_Nights;
  const Starting_time = req.body.Starting_time;
  const Ending_time = req.body.Ending_time;
  const Pet_Boarding = req.body.Pet_Boarding;

  const newReservation = new Reservation({
    First_name,
    Last_name,
    Contact,
    Email,
    Address,
    City,
    Starting_date,
    Ending_date,
    No_of_Days,
    No_of_Nights,
    Starting_time,
    Ending_time,
    Pet_Boarding,
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "priyaherath22@gmail.com",
      pass: "hquylghdavqhzmtr",
    },
  });

  newReservation
    .save()
    .then(async () => {
      res.json("Reservaiton Added");
      const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true,
      });
      const db = client.db("test");
      const collection = db.collection("reservations");
      const changeStream = collection.watch();
      const sentEmails = {};
      changeStream.on("change", (change) => {
        if (change.operationType === "insert") {
          const newDocument = change.fullDocument;
          const recipientEmail = newDocument.Email;
          const date =newDocument.Starting_date;
          const endDate= newDocument.Ending_date;

          if (!sentEmails[newDocument._id]) {
            sentEmails[newDocument._id] = true;
            const mailOptions = {
              from: "priyaherath22@gmail.com",
              to: recipientEmail,
              subject: "New data created in MongoDB",
              text: "Starting Date"+date+"end Date"+endDate,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          }
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//get Reservations
//http://localhost:8050/reservation/
//Get Request
router.route("/").get((req, res) => {
  Reservation.find()
    .then((reservation) => {
      res.json(reservation);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
