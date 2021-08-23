 //= require directive
//= require jquery
//= require jquery.flexslider-min
//= require jquery_ujs

jQuery(document).ready(function ($) {
    $.getJSON('/api/todos')
        .then(addTodos)

    $('#todoInput').keypress(function (e) {
        if (e.which == 13) createTodo()
    })

    $('#todoInput').keyup(function (e) {
        if (e.which !== 13 && e.which !== 32) {
            $('#errMessage').text('')
        }
    })

    $('.list').on('click', '.task', function () {
        updateTodo($(this))
    })

    $('.list').on('click', '.deleteBtn', function (e) {
        e.stopPropagation()
        removeTodo($(this).parent())
    })
})

function addTodos(todos) {
    // append todos to list
    JSON.pare(todos).forEach(function (todo) {
        addTodo(todo)
    });
}

function addTodo(todo) {
    var newTodo = $('<li>' + todo.name + '<span>X</span></li>')
    newTodo.addClass("task")
    newTodo.find("span").addClass("deleteBtn")
    newTodo.data('todo-id', todo._id)
    newTodo.data('todo-completed', todo.completed)

    if (todo.completed) {
        newTodo.addClass("done")
    }

    $('.list').append(newTodo)
}

function createTodo() {
    var input = $.trim($('#todoInput').val())

    if (!input) {
        $('#errMessage').text('Input cannot be blank!')
    } else {

        $.post('/api/todos', { name: input })
            .then(function (newTodo) {
                $('#todoInput').val('')
                addTodo(newTodo)
            })
            .catch(function (err) {
                console.log(err)
            })
    }
}

function updateTodo(todo) {
    var todoId = todo.data('todo-id')
    var updateUrl = '/api/todos/' + todoId
    var isCompleted = !todo.data('todo-completed')
    var updateData = { completed: isCompleted }

    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
        .then(function () {
            todo.toggleClass("done")
            todo.data('todo-completed', isCompleted)
        })
        .catch(function (err){
            console.log(err)
        })
}

function removeTodo(todo) {
    var todoId = todo.data('todo-id')
    var deleteUrl = '/api/todos/' + todoId
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
        .then(function () {
            todo.remove()
        })
}