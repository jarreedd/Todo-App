import { createTaskElement, createTasksElements, saveTasks } from "./task.js";

// DOM ELEMENTS
const taskList = document.querySelector(".tasks-list");
const form = document.querySelector("form");
const input = document.querySelector("input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function editTask(taskElement) {
    let index = taskElement.getAttribute("data-index");

    const edit_text = document.createElement("input");
    edit_text.type = "text";
    edit_text.className = "edit__text";
    edit_text.value = tasks[index].text; // args for func should be task element and tasks array
    edit_text.autocomplete = false;
    edit_text.required = true;

    const save_btn = document.createElement("button");
    save_btn.className = "btn";
    save_btn.classList.add("save__btn");
    save_btn.innerText = "save";

    const cancel_btn = document.createElement("button");
    cancel_btn.className = "btn";
    cancel_btn.classList.add("cancel__btn");
    cancel_btn.innerText = "cancel";

    taskElement.classList.add("task__editing");
    taskElement.innerHTML = "";
    taskElement.appendChild(edit_text);
    taskElement.appendChild(save_btn);
    taskElement.appendChild(cancel_btn);
}

function saveEdit(taskElement) {
    const text = taskElement.querySelector(".edit__text").value;
    const index = taskElement.getAttribute("data-index");
    tasks[index].text = text;

    saveTasks(tasks);
}

function deleteTask(taskElement) {
    // update state
    let index = taskElement.getAttribute("data-index");
    tasks.splice(index, 1);

    tasks.forEach((task, index) => {
        task.index = index;
        task.num = index + 1;
    });
    saveTasks(tasks);

    // update ui
    taskList.innerHTML = "";
    taskList.appendChild(createTasksElements(tasks));
}

function formHandler(event) {
    event.preventDefault();

    // update state
    const task = {
        text: input.value,
        isChecked: false,
        index: tasks.length,
        num: tasks.length + 1,
    };
    tasks.push(task);

    saveTasks(tasks);

    // update ui
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);

    // clear text input
    input.value = "";
}

function taskClickHandler(event) {
    // event.preventDefault();

    if (event.target.tagName === "INPUT" || event.target.tagName === "LI") {
        if (event.target.className == "edit__text") {
            return;
        } else {
            let index = event.target.getAttribute("data-index");
            tasks[index].isChecked = tasks[index].isChecked ? false : true;
        }

        saveTasks(tasks);
    }

    if (event.target.tagName === "BUTTON") {
        let taskElement = event.target.parentElement;

        if (event.target.classList.contains("edit__btn")) {
            editTask(taskElement);
        } else if (event.target.classList.contains("save__btn")) {
            saveEdit(taskElement);

            taskList.innerHTML = "";
            taskList.appendChild(createTasksElements(tasks));
        } else if (event.target.classList.contains("cancel__btn")) {
            taskList.innerHTML = "";
            taskList.appendChild(createTasksElements(tasks));
        } else if (event.target.classList.contains("delete__btn")) {
            deleteTask(taskElement);
        }
    }
}

//EVENT LISTENERS
form.addEventListener("submit", formHandler);
taskList.addEventListener("click", taskClickHandler);

taskList.appendChild(createTasksElements(tasks));
