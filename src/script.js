import { tasks, createTasksElements, saveTasks } from "./tasks.js";
import {
	addTask,
	createEditTaskElement,
	saveEdit,
	deleteTask,
} from "./task.js";

// DOM ELEMENTS
const taskList = document.querySelector(".tasks-list");
const form = document.querySelector("form");
const input = document.querySelector("input");

function updateUI() {
	taskList.innerHTML = "";
	taskList.appendChild(createTasksElements(tasks));
	console.log("USER INTERFACE HAS BEEN UPDATED");
}

function formHandler(event) {
	event.preventDefault();
	addTask(input.value);
	updateUI();

	// clear text input
	input.value = "";
}

function taskClickHandler(event) {
	// event.preventDefault();

	if (event.target.tagName === "INPUT" || event.target.tagName === "LI") {
		if (event.target.className == "edit__text") {
			return;
		} else {
			let index = event.target.dataset.index;
			tasks[index].isChecked = tasks[index].isChecked ? false : true;
		}

		saveTasks(tasks);
	}

	if (event.target.tagName === "BUTTON") {
		let taskElement = event.target.parentElement;

		if (event.target.classList.contains("edit__btn")) {
			createEditTaskElement(taskElement);
		} else if (event.target.classList.contains("save__btn")) {
			saveEdit(taskElement);
			updateUI();
		} else if (event.target.classList.contains("cancel__btn")) {
			updateUI();
		} else if (event.target.classList.contains("delete__btn")) {
			deleteTask(taskElement);
			updateUI();
		}
	}
}

//EVENT LISTENERS
form.addEventListener("submit", formHandler);
taskList.addEventListener("click", taskClickHandler);
updateUI();
