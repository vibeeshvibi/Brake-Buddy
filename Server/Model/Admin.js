const mongoose = require("mongoose");

const AdminDetailsScehma = new mongoose.Schema({
        email: String,
        phone: Number,
        pass: String,
        role: String,
});

const Admin=mongoose.model("AdminInfo", AdminDetailsScehma);
module.exports = {Admin}

//Samlpe Data 
/*
const AdminInfo = [{
    email : "vibeeshnataraj1@gmail.com",
    phone : "9344136348"
    pass : "Vibeesh.001"
    role : "Admin"
}]
*/ 