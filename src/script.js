import { tasks, createTasksElements, saveTasks } from "./tasks.js";
import { createTaskElement, editTask } from "./task.js";

// DOM ELEMENTS
const taskList = document.querySelector(".tasks-list");
const form = document.querySelector("form");
const input = document.querySelector("input");

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
