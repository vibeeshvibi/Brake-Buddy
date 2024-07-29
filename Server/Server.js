const express = require("express");
require('dotenv').config()
const cors = require("cors");
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use(cors());

// //Database Connection
const {connect} = require('./Controllers/connect')
connect()

// // Add Service
const {addService} = require('./Controllers/admin')
app.post('/addservices',addService)

// //All Service
const {fetchService} = require('./Controllers/admin')
app.post("/service",fetchService)

// //Fetch A Service
const {fetchAService} = require('./Controllers/admin')
app.post("/fetchservice",fetchAService)

// //Update A Service
const {updateService} = require('./Controllers/admin')
app.post("/updateservice", updateService)

// //Delete A Service
const {deleteService}  = require('./Controllers/admin')
app.post("/deleteservice",deleteService)


// //View All Booking
const {viewAllBooking} = require('./Controllers/admin')
app.post("/custbooking", viewAllBooking)


// //delete booking
const {deleteBooking} = require('./Controllers/admin')
app.delete('/custdeletebooking/:id', deleteBooking)

// //Update Booking
const {UpdateABooking} = require('./Controllers/admin')
app.post("/updatebooking", UpdateABooking)

// User Login / Admin Login
const {login} = require('./Controllers/user')
app.post('/login',login)



// // //User Register
const {register} = require('./Controllers/user')
app.post('/signup',register)

// // //ADD Booking and Send Email
const {addBooking} = require('./Controllers/user')
app.post("/addbooking", addBooking)

// //Fetch All Completed Booking
const {fetchHistory} = require('./Controllers/user')
app.post("/history",fetchHistory)

// //Fetch All Booking without Status Completed
const {fetchBooking} = require('./Controllers/user')
app.post('/fetchbook',fetchBooking)



// //Details of  Booking
const {detailBooking} = require('./Controllers/user')
app.post("/viewbooking",detailBooking)

// // //Admin and User Forgot Password
const {forgotPassword} = require('./Controllers/user')
app.post("/forgotpasswordotp",forgotPassword)

// //Update Password
const {updatePassword} = require('./Controllers/user')
app.post("/forgotpasswordupdate", updatePassword)

//auth service

app.post("/authcheck", async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ status: 'error', message: 'Token required' });
    }

    try {
        const verify = jwt.verify(token, process.env.SECRECT_KEY);
        res.status(200).send({ status: 'success', message: 'Token is valid' });
        next();
    } catch (error) {
        console.error('Token verification error:', error); 
        res.status(401).send({ status: 'error', message: 'Invalid token' });
    }
});

//server running port

app.listen(process.env.PORT,()=>{
    console.log(`The server is running on the port of ${process.env.PORT}`);
})


