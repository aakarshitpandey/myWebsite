const express = require('express')
const path = require('path')
const app = express()
const bodyparser = require('body-parser')
let PORT = process.env.PORT | 4000

app.use(express.static(__dirname))
app.use(bodyparser())

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/back2.html'))
})

app.get('/:fileName', (req, res, next) => {
    res.sendFile(path.join(__dirname + `/${req.params.fileName}.html`));
})

app.post('/', (req, res, next) => {
    console.log(`Post request recieved`)
    const message = req.body;
    console.log(req.url)
    console.log(message)
    res.status(201).redirect(`${req.url}`)
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});