const express = require("express"); //using the json file dependencies(node_modules)
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

//declare a constant variable
const app = express();
//require  for read variables(MONGODB_URL)
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

//database link
const URL = process.env.MONGODB_URL;

const PORT = process.env.PORT || 8050;
//create mongo configurations

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});


const connectio = mongoose.connection;
connectio.once("open",()=>{
    console.log("mongoDB connection successful !!!");
})


//Reservation
const ReservationRouter = require("./routes/reservationRoute")
app.use("/reservation",ReservationRouter);

//User
const UserRouter = require("./routes/userRoute")
app.use("/user",UserRouter);

//Contact
const ContactRouter = require("./routes/contactRouts")
app.use("/contact",ContactRouter);

//desease predict
const DiseaseRouter = require('./routes/symptoms')
app.use("/diagnose",DiseaseRouter);




//run the app using portd
app.listen(PORT, () =>{
    console.log(`Server is up and running on port number: ${PORT}`);

})

   