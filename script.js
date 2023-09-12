const todoList = document.querySelector('[data-key="todos"]')
const form = document.querySelector('form')
const input = document.querySelector('input')

const todoData = []

const addTodo = (todoText) => {
    todoData.push(todoText)

    const li = document.createElement('li')
    li.innerText = todoText
    todoList.appendChild(li)
}

const formHandler = (event) => {
    event.preventDefault()
    addTodo(input.value)
    input.value = ''
}

form.addEventListener('submit', formHandler)