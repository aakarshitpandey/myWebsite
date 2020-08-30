const functions = require('firebase-functions');
const { request } = require('express');
const { response } = require('express');
const creds = require('./creds.json')
const cors = require('cors')({ origin: true })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.sendMessage = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        functions.logger.info("Sending Message!", { structuredData: true });
        sendMessage(req.body.message)
        functions.logger.info(req.body, { structuredData: true });
        res.status(201).send(`${req.body.redirectUrl}`)
    })
});

function sendMessage(sendText) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(creds.SENDGRID_API_KEY);
    const msg = {
        to: 'aakarshit.pandey7@gmail.com',
        from: 'aakarshit.pandey7@gmail.com',
        subject: 'Message from Personal Website',
        text: `Hi! someone messaged you on your website: ${sendText}`,
        html: `<strong>Hi! someone messaged you on your website:</strong><p>${sendText}</p>`,
    };
    sgMail.send(msg);
}
