const mongoose = require("mongoose");

const AddServiceScehma = new mongoose.Schema({
        sname: String,
        sdesc: String,
        samount: String,
    },  { collection: "AddService", } );
const AService=mongoose.model("AddService", AddServiceScehma);
module.exports = {AService}

//Samlpe Data 
/*
const AddService = [{
    sname : "General Service",
    sdesc : "description about your service"
    samount : "500"
}]
*/ 