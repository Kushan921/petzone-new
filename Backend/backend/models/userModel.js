const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    First_name : {
        type : String,
        required: true
    },
    Last_name: {
        type: String,
        required: true
    },
    Email : {
        type : String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
 

})

//user table and path
const User = mongoose.model("user",UserSchema);
module.exports = User;