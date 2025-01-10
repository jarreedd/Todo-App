// DOM ELEMENTS
const taskList = document.querySelector(".tasks-list");
const form = document.querySelector("form");
const input = document.querySelector("input");

// TEMP STATE
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// FUNCTIONS
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function resetIndex() {
    document.querySelectorAll(".tasks-list li").forEach((li, index) => {
        li.dataset.index = index;
    });
}

function formHandler(event) {
    event.preventDefault();

    // update state
    const task = { text: input.value, isChecked: false };
    tasks.push(task);

    saveTasks();

    // create task
    const li = document.createElement("li");
    li.dataset.index = tasks.length - 1;
    li.innerText = input.value;
    taskList.appendChild(li);

    // create task delete button
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    // clear text input
    input.value = "";
}

function taskClickHandler(event) {
    event.preventDefault();

    if (event.target.tagName === "LI") {
        // update state
        let index = event.target.getAttribute("data-index");
        tasks[index].isChecked = tasks[index].isChecked ? false : true;

        saveTasks();

        // update ui
        event.target.classList.toggle("checked");
    }

    if (event.target.tagName === "SPAN") {
        // update state
        let index = event.target.parentElement.getAttribute("data-index");
        tasks.splice(index, 1);

        saveTasks();

        // update ui
        event.target.parentElement.remove();
        resetIndex();
    }
}

//EVENT LISTENERS
form.addEventListener("submit", formHandler);
taskList.addEventListener("click", taskClickHandler);

// ON START
tasks.forEach((task, index) => {
    // create task
    const li = document.createElement("li");
    li.dataset.index = index;
    li.innerText = task.text;
    task.isChecked && li.classList.add("checked");
    taskList.appendChild(li);

    // create task delete button
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
});
