const mongoose = require("mongoose");
//Database Connection
module.exports.connect = () => {
    mongoose.connect('mongodb+srv://vibeeshn21aid:bike-service@bike-service.vy9tzf1.mongodb.net/?retryWrites=true&w=majority&appName=bike-service', {

    })
        .then(() => {
            console.log("The database is connected")
        })
}