
const { User } = require("../Model/Customer")
const jwt = require('jsonwebtoken');    
const {transporter} = require('./nodemailer')
require('dotenv').config()
const { CBooking } = require('../Model/AddBooking')
const { Admin } = require('../Model/Admin')

//User Login
module.exports.login = async (req, res)  => {
    const { uname, password } = req.body;
    // console.log(req.body);
    try {
        let user;

        if (uname === "vibeeshnataraj1@gmail.com") {
            // console.log("Hiii");
            user = await Admin.findOne({ email: uname });

        } else {
            user = await User.findOne({ email: uname });
        }
        console.log(user);

        // Check if user exists
        if (!user) {
            return res.json({ status: "error", error: "User Not Found" });
        }

        // Validate password
        if (password !== user.pass) {
            return res.json({ status: "error", error: "Invalid Password" });
        }

        // Successful login
        const token = jwt.sign({email:user.email,id:user._id},process.env.SECRECT_KEY);
        return res.json({ status: "ok", data: user , token:token, role:user.role});
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: "error", error: "Server Error" });
    }

}


//User Register

module.exports.register = async (req, res) =>{
    var { email, phone, pass } = req.body;
    // pass = await bcrypt.hash(pass, 13);
    const role = "user";
    try {
        const check = await User.findOne(({ $or: [{ email }, { phone }] }));
        if (check === null) {
            await User.create({
                email,
                phone,
                pass,
                role,
            });
            res.send({ status: "ok" });
        } 
        else {
            res.send({ status: "error" });
        }
    } catch (error) {
        res.send({ send: `catch error ${error}` });
    }
}

//Add Booking and send email

module.exports.addBooking = async (req, res) =>{
            const { date, name, email, phone, vname, vno, vmodel, address, service } = req.body;
            const vehicle_data = req.body
            console.log(vehicle_data);
            console.log(date,name);
            var status = "Pending";
            try {
                const check = await CBooking.findOne({ date: date, vno: vno })
                console.log(check);
                const check2 = await CBooking.findOne({ vno: vno, status: { $in: ["Pending", "Ready"] } })
                // var count1 = await Admin.find({}, { noofbook: 70 })
                // console.log(count1);
                // const count = await CBooking.find({ date: date }).count()
                // count1 = count1[0].noofbook
                const data=new CBooking({date,name,email,phone,vname,vno,vmodel,address,service,status}) 
                // await data.save();
                // res.send({ status: "ok" });
                if (check === null) {
                    if (check2 === null) {
                        // console.log("Hello");
                            // console.log("Hello");
                            await CBooking.create({ date, name, email, phone, vname, vno, vmodel, address, status, service });
                            let mailOptions = {
                                from: 'brakebuddy8@gmail.com',
                                to: 'vibeeshnataraj1@gmail.com',
                                subject: 'Booking',
                                text: `New Customer Booking Details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nVehicle Name: ${vname}\nVehicle Number: ${vno}\nVehicle Model: ${vmodel}\nAddress: ${address}\nService: ${service}\nDate: ${date}`,
                            };
                            let mailOptionsForCust = {
                                from: 'brakebuddy8@gmail.com',
                                to: email,
                                subject: 'Booking',
                                text: `Dear ${name}\n\nYour Booking for Vehicle Name: ${vname}\nVehicle Number: ${vno}\nVehicle Model: ${vmodel}\nAddress: ${address}\nService: ${service}\nDate: ${date} Registered Successfully\nWe will intimate you about the status quickly\n\nThank You for choosing Brake Buddy!`,
                            };
                            transporter.sendMail(mailOptionsForCust, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message sent: %s', info.messageId);
                            });
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message sent: %s', info.messageId);
                            });
                            
                            // .then(() => {
                                console.log("Booked email sent");
                            // }).catch((err) => {
                                // console.log(err);
                            // });
                            res.send({ status: "ok" });
                    } else {
                        res.send({ status: "NotCompleted" })
                    }
                }
                 else {
                    res.send({ status: "exist" });
                }
            } catch (error) {
                // console.log("Error")
                res.send({ send:`${error}`  });
                console.log(`${error}`);
            }
}


// Fetch all completed booking
module.exports.fetchHistory = async(req,res)=>{
        const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email, status: "Completed" });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
} 

// fetch booking
module.exports.fetchBooking=async(req,res)=>{
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email, status: { $nin: ["Completed"] } });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
}

//Details of Booking 
module.exports.detailBooking = async(req,res)=>{
        const { _id } = req.body;
    try {
        const data = await CBooking.findOne({ _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
}

// Admin and User Forgot Password
module.exports.forgotPassword = async(req,res)=>{
    var { email, otp } = req.body;
    try {
        let mailOptionsu = {
            from: 'brakebuddy8@gmail.com',
            to: email,
            subject: 'Reset passeord',
            text: `Yout OTP : ${otp}`,
        };
    transporter.sendMail(mailOptionsu, (error, info) => {
        if (error) {
            return console.log(`Error in if : ${error}`);
        }
        console.log('Reset Password Message sent: %s', info.messageId);
    });
        res.send({ status: "ok" });
    } catch (error) {
        console.log(error);
    }
}

//// //Update Password

module.exports.updatePassword = async(req,res)=>{
    var { email, pass } = req.body;
    // pass = await bcrypt.hash(pass, 13);
    try {
        if (email === "vibeeshnataraj1@gmail.com" || email === "9344136348") {
            data = await Admin.updateOne({ email: email }, { $set: { pass: pass } });
        } else {
            data = await User.updateOne({ email: email }, { $set: { pass: pass } });
        }
        res.send({ status: "ok", data: data });
    } catch (error) {
        console.log(error);
    }
}