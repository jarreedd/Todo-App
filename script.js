const todoList = document.querySelector('[data-key="todos"]')
const form = document.querySelector('form')
const input = document.querySelector('input')

const todoData = JSON.parse(localStorage.getItem('todos')) || []
todoData.forEach(todo => {
    const li = document.createElement('li')
    li.innerText = todo
    todoList.appendChild(li)
});

const addTodo = (todoText) => {
    todoData.push(todoText)
    localStorage.setItem('todos', JSON.stringify(todoData))

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