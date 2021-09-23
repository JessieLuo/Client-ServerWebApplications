const express = require('express')
const mongoose = require('mongoose')
const https = require('https')
const Client = require('./model/client')
const validator = require('validator')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

mongoose.connect("mongodb://localhost:27017/client", { useNewUrlParser: true })

app.post('/', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const client = new Client({
        fname: firstName,
        lname: lastName,
        email: email
    })
    client
        .save()
        .catch((err) => console.log(err));

    // if (res.statusCode === 200) {
    //     res.sendFile(__dirname + "/success.html")
    // }
    // else {
    //     res.sendFile(__dirname + "/404.html")
    // }
    res.send('hello client')

})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
}

app.listen(port, function (req, res) {
    console.log('server is running successfully')
})

