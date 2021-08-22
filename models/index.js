const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/todo-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

mongoose.Promise = Promise

module.exports.Todo = require('./todo')