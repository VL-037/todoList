require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))

const todoRoutes = require('./routes/todos')

app.get('/', function (req, res) {
    res.sendFile('index.html')
})

app.use('/api/todos', todoRoutes)

const port = process.env.PORT || 3000

app.listen(port, function () {
    console.log("App is running on port " + port)
})