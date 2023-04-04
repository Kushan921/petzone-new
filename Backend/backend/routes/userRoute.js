const router = require("express").Router();
const { request } = require("express");
let  User = require("../models/userModel")


//User Registration
//http://localhost:8050/user/add
router.route("/add").post((req,res)=>{
    const First_name = req.body.First_name;
    const Last_name = req.body.Last_name;
    const Email = req.body.Email;
    const Password = req.body.Password;
    

    const newUser = new  User({
        First_name,
        Last_name,
        Email,
        Password

    })

    newUser.save().then(()=>{
        res.json("User Registered Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//get User
//http://localhost:8050/user/
//Get Request
router.route("/").get((req,res)=>{
    User.find().then((user)=>{
        res.json(user)
    }).catch((err)=>{
        console.log(err)
    })
})

//User login
//http://localhost:8050/user/login
router.route("/login").post((req, res) => {
    const Password = req.body.Password;
    User.findOne({ Email: req.body.Email }).then(user => {
        // Check if Attendee exists
        if (!user) {
            return res.status(404).json({Email: "Email not found"});
        } else {
            // Check password
            if (Password === user.Password) {
                res.json(user);
                
            } else {
                return res.status(400).json({Password: "Password incorrect"});
            }
        }
    });
});

module.exports = router;