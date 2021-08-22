const mongoose = require('mongoose')
const dbURL = process.env.DB_URL || 'mongodb://localhost/todo-api'
mongoose.set('debug', true)
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

mongoose.Promise = Promise

module.exports.Todo = require('./todo')