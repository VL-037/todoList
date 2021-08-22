const db = require('../models')

module.exports.getTodos = function (req, res) {
    db.Todo.find()
        .then(function (todos) {
            res.json(todos)
        })
        .catch(function (err) {
            res.send(err)
        })
}

module.exports.createTodo = function (req, res) {
    db.Todo.create(req.body)
        .then(function (newTodo) {
            res.status(201).json(newTodo)
        })
        .catch(function (err) {
            res.send(err)
        })
}

module.exports.getTodo = function (req, res) {
    db.Todo.findById(req.params.id)
        .then(function (todo) {
            res.json(todo)
        })
        .catch(function (err) {
            res.send(err)
        })
}

module.exports.updateTodo = function (req, res) {
    db.Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(function (todo) {
            res.json(todo)
        })
        .catch(function (err) {
            res.send(err)
        })
}

module.exports.deleteTodo = function (req, res) {
    db.Todo.deleteOne({ _id: req.params.id })
        .then(function(){
            res.send('Todo deleted')
        })
        .catch(function(err){
            res.send(err)
        })
}
