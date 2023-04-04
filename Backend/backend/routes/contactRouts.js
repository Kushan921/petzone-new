const router = require("express").Router();
const { request } = require("express");
let  Contact = require("../models/contactModel")


//add contact 
//http://localhost:8050/contact/add
router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    

    const newContact = new  Contact({
        name,
        email,
        subject,
        message

    })

    newContact.save().then(()=>{
        res.json("Contact added Successfully..")
    }).catch((err)=>{
        console.log(err);
    })
})

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