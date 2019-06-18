const express = require('express')
const path = require('path')
const app = express()
const bodyparser = require('body-parser')
let PORT = process.env.PORT | 8000
const fs = require('fs')
let rawdata = fs.readFileSync('creds.json');
let creds = JSON.parse(rawdata);

app.use(express.static(__dirname))
app.use(bodyparser())

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

app.get('/:fileName', (req, res, next) => {
    fs.readdir(path.join(__dirname + '/views'), (err, items) => {
        if (items.findIndex((element) => {
            return element.localeCompare(`${req.params.fileName}` + '.html') === 0
        }) !== -1) {
            res.sendFile(path.join(__dirname + `/views/${req.params.fileName}.html`));
        } else {
            res.status(404).send()
        }
    })

})

app.post('/', (req, res, next) => {
    console.log(`Post request recieved`)
    console.log(req.body.message)
    sendMessage(req.body.message)
    res.status(201).redirect(`${req.url}#contact-me`)
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

function sendMessage(sendText) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(creds.SENDGRID_API_KEY);
    const msg = {
        to: 'aakarshit.pandey7@gmail.com',
        from: 'cooldudepandey@gmail.com',
        subject: 'Message from Personal Website',
        text: `Hi! someone messaged you on your website: ${sendText}`,
        html: `<strong>Hi! someone messaged you on your website:</strong><p>${sendText}</p>`,
    };
    sgMail.send(msg);
}