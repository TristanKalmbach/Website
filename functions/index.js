const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = 'tristan.kalmbach@gmail.com';
const gmailPassword = 'V1k1ng18@';
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    },
});

const ContactData = {
    Email: String,
    Name: String,
    Address: String,
    Address2: String,
    City: String,
    State: String,
    Zip: Number,
    Message: String,
    ContactAllowed: Boolean, // Can I contact them with future emails
    ContactDate: Date, // Date contact originally sent me a message
}

exports.sendContactEmail = functions.https.onCall((data, context) => {
    console.log(data);
    ContactEmail(data);
});

async function ContactEmail(data) {    
    mailTransport.sendMail({
        from: data.Name + '<' + data.Email + '>',
        to: 'Tristan Kalmbach <tristan.kalmbach@gmail.com>',
        subject: 'New Contact - ' + data.Name,
        text: 'Message: ' + data.Message,
    }, (error, info) => {
        console.log(error);
        console.log(info);
    });
}