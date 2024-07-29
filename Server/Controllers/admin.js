const { AService } = require('../Model/Addservice')
const { CBooking } = require('../Model/AddBooking');
const {transporter} = require('./nodemailer')
// Add Service
module.exports.addService = async (req, res) => {
    const { sname, sdesc, samount } = req.body;
    try {
        const check = await AService.findOne({ sname });
        if (check === null) {
            await AService.create({ sname, sdesc, samount, });
            res.send({ status: "ok" });
        } else {
            res.send({ status: "error1" });
        }
    } catch (error) {
        res.send({ send: "catch error" });
    }

}

//fetch all services

module.exports.fetchService = async (req, res) => {
    try {
        const data = await AService.find();
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
}

//fetch a service

module.exports.fetchAService = async(req,res)=>{
    const { _id } = req.body;
    try {
        const data = await AService.findOne({ _id: _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
}

//Update a service

module.exports.updateService=async(req,res)=>{
    var { data } = req.body;
    try {
        data = await AService.updateOne({ _id: data._id }, { $set: { sname: data.sname, sdesc: data.sdesc, samount: data.samount } });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
}

//update Service

module.exports.UpdateABooking=async(req,res)=>{
    const { _id, status,email } = req.body;
    try {
        console.log(_id);
        var data = await CBooking.updateOne({ _id: _id }, { $set: { status: status } });
        console.log(status);
        data = await CBooking.findOne({ _id: _id });

        if (status === "Ready") {
            let mailOptionsu = {
                from: 'brakebuddy8@gmail.com',
                to: email,
                subject: 'Booking',
                text: 'Service for your Vehicle is Completed and Pick your Vehicle\nHappy and safe Ride!',
            };
        transporter.sendMail(mailOptionsu, (error, info) => {
            if (error) {
                return console.log(`Error in if : ${error}`);
            }
            console.log('Message sent: %s', info.messageId);
        });
        
        }
        res.send({ status: "ok", data: data });
    } catch (error) {
        console.log(error);
    }
}

// delete service 

module.exports.deleteService = async(req,res)=>{
    const { _id } = req.body;
    try {
        const data = await AService.deleteOne({ _id: _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
}

//view all booking

module.exports.viewAllBooking=async(req,res)=>{
    const { status } = req.body;
    try {
        if (status == null) {
            const data = await CBooking.find();
            res.send({ status: "OK", data: data });
        } else {
            const data = await CBooking.find({ status });
            res.send({ status: "OK", data: data });
        }

    } catch (error) {
        console.log(error);
    }
}


//delete booking

module.exports.deleteBooking=async(req,res)=>{
    const { id } = req.params;
    try {
        const result = await CBooking.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ status: 'OK', message: 'Booking deleted successfully' });
        } else {
            res.status(404).json({ status: 'error', error: 'Booking not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
}