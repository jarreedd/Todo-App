const todoList = document.querySelector('[data-key="todos"]');
const form = document.querySelector("form");
const input = document.querySelector("input");

const todoData = JSON.parse(localStorage.getItem("todos")) || [];

function createToDoList() {
    todoList.innerHTML = "";

    todoData.forEach((todo) => {
        const li = document.createElement("li");
        li.innerText = todo;
        todoList.appendChild(li);
    });
}

function addTodo(todoText) {
    todoData.unshift(todoText);
    localStorage.setItem("todos", JSON.stringify(todoData));

    createToDoList();
}

function formHandler(event) {
    event.preventDefault();
    addTodo(input.value);
    input.value = "";
}

createToDoList();

form.addEventListener("submit", formHandler);
