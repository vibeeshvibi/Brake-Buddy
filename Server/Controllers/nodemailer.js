const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'brakebuddy8@gmail.com',
        pass: 'hnnr zczr gddl dqja'
    }
});

module.exports = {transporter}