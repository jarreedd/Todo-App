import { tasks, updateTasks, createTasksElements, saveTasks } from "./tasks.js";
import {
	addTask,
	createEditTaskElement,
	saveEdit,
	deleteTask,
	createReorderTaskElement,
	saveTasksOrder,
} from "./task.js";
import { moveItem } from "../utils/moveItem.js";

// DOM ELEMENTS
const taskList = document.querySelector(".tasks-list");
const form = document.querySelector("form");
const newTaskInput = document.querySelector(".input-newTask");

/**
 *
 * @param {Array} newTasksArray When ommited, the User Interface is updated with old task list
 */
function updateUI(newTasksArray) {
	newTasksArray && updateTasks(newTasksArray);
	taskList.innerHTML = "";
	taskList.appendChild(createTasksElements(tasks));
	console.log("USER INTERFACE HAS BEEN UPDATED");
}

function formHandler(event) {
	event.preventDefault();
	addTask(newTaskInput.value);
	updateUI();

	// clear text input
	newTaskInput.value = "";
}

function taskClickHandler(event) {
	// event.preventDefault();

	if (
		event.target.tagName === "LI" ||
		event.target.classList.contains("custom-checkedbox") ||
		event.target.classList.contains("uncheckedbox")
	) {
		let index = event.target.dataset.index;
		tasks[index].isChecked = tasks[index].isChecked ? false : true;
		saveTasks(tasks);
	}

	if (event.target.tagName === "BUTTON") {
		const taskElement = event.target.parentElement;

		if (event.target.classList.contains("edit__btn")) {
			createEditTaskElement(taskElement);
		} else if (event.target.classList.contains("save-edit-btn")) {
			saveEdit(taskElement);
			updateUI();
		} else if (event.target.classList.contains("cancel-edit-btn")) {
			updateUI();
		} else if (event.target.classList.contains("delete__btn")) {
			deleteTask(taskElement);
			updateUI();
		} else if (event.target.classList.contains("order__btn")) {
			createReorderTaskElement(taskElement);
		} else if (event.target.classList.contains("save-reorder-btn")) {
			const prev_num = taskElement.dataset.num;
			const new_num = taskElement.querySelector(".edit__num").value;
			updateUI(saveTasksOrder(prev_num, new_num));
		} else if (event.target.classList.contains("cancel-reorder-btn")) {
			updateUI();
		}
	}
}

//EVENT LISTENERS
form.addEventListener("submit", formHandler);
taskList.addEventListener("click", taskClickHandler);
updateUI();
