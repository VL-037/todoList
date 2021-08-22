const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos')

router.route('/')
    .get(todosController.getTodos)
    .post(todosController.createTodo)

router.route('/:id', )
    .get(todosController.getTodo)
    .put(todosController.updateTodo)
    .delete(todosController.deleteTodo)

module.exports = router