const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = 'tristan.kalmbach@gmail.com';
const gmailPassword = 'V1k1ng18@';
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

exports.sendContactEmail = functions.firestore.document('contacts/{contactId}').onCreate((snap, context) => {
    const data = snap.data();
    const who = data.Name;
    const email = data.Email;
    const message = data.Message;

    if (!data || !who || !email || !message) {
        console.log('Error executing cloud function.');
        return;
    }

    mailTransport.sendMail(
        {
            from: who,
            to: 'Tristan Kalmbach <tristan.kalmbach@gmail.com>',
            subject: 'New Contact - ' + email,
            text: 'Message: ' + message
        },
        (error, info) => {
            console.log(error);
            console.log(info);
        }
    );
});
