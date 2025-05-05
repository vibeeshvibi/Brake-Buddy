const mongoose = require("mongoose");
module.exports.connect = () => {
    mongoose.connect('mongodb+srv://brakebuddy8:245EbgKJ6Hooaorb@datacluster.4jsdrwg.mongodb.net/', {

    })
        .then(() => {
            console.log("The database is connected")
        })
}
