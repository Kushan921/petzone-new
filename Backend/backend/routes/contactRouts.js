const router = require("express").Router();
const { request } = require("express");
let  Contact = require("../models/contactModel")
const nodemailer = require('nodemailer');


//add contact 
//http://localhost:8050/contact/add
// router.route("/add").post((req,res)=>{
//     const name = req.body.name;
//     const email = req.body.email;
//     const subject = req.body.subject;
//     const message = req.body.message;
    

//     const newContact = new  Contact({
//         name,
//         email,
//         subject,
//         message

//     })

//     newContact.save().then(()=>{
//         res.json("Contact added Successfully..")
//     }).catch((err)=>{
//         console.log(err);
//     })
// })
router.route("/send").post((req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'wearepetzone24@gmail.com',
          pass: 'roislvhskzjbrlfv'
        }
      });

      const mailOptions = {
        from: email,
        to: 'wearepetzone24@gmail.com',
        subject: name,
        text: message,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send('error');
        } else {
          console.log('Email sent: ' + info.response);
          res.send('success');
        }
      });
});

//get contact
//http://localhost:8050/contact/
router.route("/").get((req,res)=>{
    Contact.find().then((contact)=>{
        res.json(contact)
    }).catch((err)=>{
        console.log(err)
    })
})


module.exports = router;