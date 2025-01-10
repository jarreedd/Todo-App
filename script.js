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

function createTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        // create task
        const li = document.createElement("li");
        li.className = "task";
        li.dataset.index = index;
        taskList.appendChild(li);

        // create checkboxes
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task_${index + 1}`;
        checkbox.checked = task.isChecked ? true : false;
        checkbox.dataset.index = index;
        li.appendChild(checkbox);

        const custom_checkbox = document.createElement("label");
        custom_checkbox.className = "custom-checkbox";
        custom_checkbox.setAttribute("for", `task_${index + 1}`);
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
        task_text.setAttribute("for", `task_${index + 1}`);
        task_text.innerText = task.text;
        li.appendChild(task_text);

        // create task delete button
        const delete_btn = document.createElement("button");
        delete_btn.className = "delete__btn";
        delete_btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4 6.17647H20M9 3H15M10 16.7647V10.4118M14 16.7647V10.4118M15.5 21H8.5C7.39543 21 6.5 20.0519 6.5 18.8824L6.0434 7.27937C6.01973 6.67783 6.47392 6.17647 7.04253 6.17647H16.9575C17.5261 6.17647 17.9803 6.67783 17.9566 7.27937L17.5 18.8824C17.5 20.0519 16.6046 21 15.5 21Z"
                    stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `;
        li.appendChild(delete_btn);
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
    li.className = "task";
    li.dataset.index = tasks.length - 1;
    taskList.appendChild(li);

    // create checkboxes
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task_${tasks.length}`;
    checkbox.dataset.index = tasks.length - 1;
    li.appendChild(checkbox);

    const custom_checkbox = document.createElement("label");
    custom_checkbox.className = "custom-checkbox";
    custom_checkbox.setAttribute("for", `task_${tasks.length}`);
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
    task_text.setAttribute("for", `task_${tasks.length}`);
    task_text.innerText = task.text;
    li.appendChild(task_text);

    // create task delete button
    const delete_btn = document.createElement("button");
    delete_btn.className = "delete__btn";
    delete_btn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4 6.17647H20M9 3H15M10 16.7647V10.4118M14 16.7647V10.4118M15.5 21H8.5C7.39543 21 6.5 20.0519 6.5 18.8824L6.0434 7.27937C6.01973 6.67783 6.47392 6.17647 7.04253 6.17647H16.9575C17.5261 6.17647 17.9803 6.67783 17.9566 7.27937L17.5 18.8824C17.5 20.0519 16.6046 21 15.5 21Z"
                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `;
    li.appendChild(delete_btn);

    // clear text input
    input.value = "";
}

function taskClickHandler(event) {
    // event.preventDefault();

    if (event.target.tagName === "INPUT" || event.target.tagName === "LI") {
        // update state
        let index = event.target.getAttribute("data-index");
        tasks[index].isChecked = tasks[index].isChecked ? false : true;

        saveTasks();
    }

    if (event.target.tagName === "BUTTON") {
        // update state
        let index = event.target.parentElement.getAttribute("data-index");
        tasks.splice(index, 1);

        saveTasks();

        // update ui
        createTasks();
    }
}

//EVENT LISTENERS
form.addEventListener("submit", formHandler);
taskList.addEventListener("click", taskClickHandler);

// ON START
createTasks();
