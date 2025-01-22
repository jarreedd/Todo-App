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

function createTask(task) {
    // create task
    const li = document.createElement("li");
    li.className = "task";
    li.dataset.index = task.index;

    // create checkboxes
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task_${task.num}`;
    checkbox.checked = task.isChecked;
    checkbox.dataset.index = task.index;
    li.appendChild(checkbox);

    const custom_checkbox = document.createElement("label");
    custom_checkbox.className = "custom-checkbox";
    custom_checkbox.setAttribute("for", `task_${task.num}`);
    custom_checkbox.innerHTML = /** icon svg */ `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M16.8 8.40002L9.64043 15.6L7.19995 13.1457" 
                stroke="black" stroke-width="2" stroke-linecap="roun stroke-linejoin="round"
            />
        </svg>
    `;
    li.appendChild(custom_checkbox);

    // create task text
    const task_text = document.createElement("label");
    task_text.className = "task__text";
    task_text.setAttribute("for", `task_${task.num}`);
    task_text.innerText = task.text;
    li.appendChild(task_text);

    // create edit task button
    const edit_btn = document.createElement("button");
    edit_btn.className = "icon-btn";
    edit_btn.classList.add("edit__btn");
    edit_btn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
            d="M4.80002 15.6L9.00002 19.2M4.20002 15.6L16.0314 3.35545C17.3053 2.08155 19.3707 2.08155 20.6446 3.35545C21.9185 4.62935 21.9185 6.69475 20.6446 7.96865L8.40002 19.8L2.40002 21.6L4.20002 15.6Z" 
            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    li.appendChild(edit_btn);

    // create task delete button
    const delete_btn = document.createElement("button");
    delete_btn.className = "icon-btn";
    delete_btn.classList.add("delete__btn");
    delete_btn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4 6.17647H20M9 3H15M10 16.7647V10.4118M14 16.7647V10.4118M15.5 21H8.5C7.39543 21 6.5 20.0519 6.5 18.8824L6.0434 7.27937C6.01973 6.67783 6.47392 6.17647 7.04253 6.17647H16.9575C17.5261 6.17647 17.9803 6.67783 17.9566 7.27937L17.5 18.8824C17.5 20.0519 16.6046 21 15.5 21Z"
                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `;
    li.appendChild(delete_btn);

    return li;
}

function createTasks(tasks) {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        taskList.appendChild(createTask(task));
    });
}

function editTask(task) {
    let index = task.getAttribute("data-index");

    const edit_text = document.createElement("input");
    edit_text.type = "text";
    edit_text.className = "edit__text";
    edit_text.value = tasks[index].text;
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

    task.classList.add("task__editing");
    task.innerHTML = "";
    task.appendChild(edit_text);
    task.appendChild(save_btn);
    task.appendChild(cancel_btn);
}

function saveEdit(task) {
    const text = task.querySelector(".edit__text").value;
    const index = task.getAttribute("data-index");
    tasks[index].text = text;

    saveTasks();
    createTasks(tasks);
}

function deleteTask(task) {
    // update state
    let index = task.getAttribute("data-index");
    tasks.splice(index, 1);

    tasks.forEach((task, index) => {
        task.index = index;
        task.num = index + 1;
    });
    saveTasks();

    // update ui
    createTasks(tasks);
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

    saveTasks();

    // update ui
    const taskElement = createTask(task);
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

            saveTasks();
        }
    }

    if (event.target.tagName === "BUTTON") {
        let task = event.target.parentElement;

        if (event.target.classList.contains("edit__btn")) {
            editTask(task);
        } else if (event.target.classList.contains("save__btn")) {
            saveEdit(task);
        } else if (event.target.classList.contains("cancel__btn")) {
            console.log("cancel edit");
        } else if (event.target.classList.contains("delete__btn")) {
            deleteTask(task);
        }
    }
}

//EVENT LISTENERS
form.addEventListener("submit", formHandler);
taskList.addEventListener("click", taskClickHandler);

// ON START
createTasks(tasks);
