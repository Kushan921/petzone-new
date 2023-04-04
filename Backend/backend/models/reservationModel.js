const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    First_name : {
        type : String,
        required: true
    },
    Last_name: {
        type: String,
        required: true
    },
    Contact : {
        type : String,
        required: true
    },
    Email : {
        type : String,
        required: true
    },
    Address : {
        type : String,
        required: true
    },
    City : {
        type : String,
        required: true
    },
    Starting_date : {
        type : String,
        required: true
    },
    Ending_date : {
        type : String,
        required: true
    },
    No_of_Days : {
        type : String,
        required: true
    },
    No_of_Nights : {
        type : String,
        required: true
    },
    Starting_time : {
        type : String,
        required: true
    },
    Ending_time : {
        type : String,
        required: true
    },
    Pet_Boarding : {
        type : String,
        required: true
    },

})

//reservation table and path
const Reservation = mongoose.model("reservation",ReservationSchema);
module.exports = Reservation;