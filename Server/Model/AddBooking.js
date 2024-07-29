const mongoose = require("mongoose");
const AddBookingScehma = new mongoose.Schema({
        date: String,
        name: String,
        email: String,
        phone: String,
        vname: String,
        vno: String,
        vmodel: String,
        address: String,
        status: String,
        service: [String],
    });
const CBooking = mongoose.model("AddBooking", AddBookingScehma);
module.exports= {CBooking}


//Samlpe Data 
/*
const AddService = [{
    date : "General Service",
    name : "9344136348"
    email : "vibeesh.001@gmail.com",
    phone : "9344136348",
    vname : "Royal Enfield",
    vno : "TN56S2428",
    vmodel : "Pulsar NS 160",
    address : "Perundurai",
    status : "Pending",
    service : ["General service"]
}]
*/ 