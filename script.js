//DOM ELEMENTS
const taskList = document.querySelector(".tasks-list");
const form = document.querySelector("form");
const input = document.querySelector("input");

// FUNCTIONS
function formHandler(event) {
    event.preventDefault();

    // create task
    const li = document.createElement("li");
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

    if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
    }
}

//EVENT LISTENERS
form.addEventListener("submit", formHandler);
taskList.addEventListener("click", taskClickHandler);
