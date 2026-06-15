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
/**
 * The list container where task items are rendered.
 * @type {HTMLUListElement | null}
 */
const taskList = document.querySelector(".tasks-list");

/**
 * The form used to submit a new task.
 * @type {HTMLFormElement | null}
 */
const form = document.querySelector("form");

/**
 * The input field for entering a new task label.
 * @type {HTMLInputElement | null}
 */
const newTaskInput = document.querySelector(".input-newTask");

/**
 * Updates the task list by optionally replacing the task data and rerendering the task list.
 * @param {Array<Object>} [newTasksArray] - Optional new task array to replace current tasks.
 * @returns {void}
 */
function updateTaskListElement(newTasksArray) {
	newTasksArray && updateTasks(newTasksArray);
	taskList.innerHTML = "";
	taskList.appendChild(createTasksElements(tasks));
	console.log("TASK LIST HAS BEEN UPDATED");
}

/**
 * Handles task form submission and adds a new task.
 * @param {SubmitEvent} event - The submit event from the add-task form.
 * @returns {void}
 */
function formHandler(event) {
	event.preventDefault();
	const formData = new FormData(event.target);
	const data = Object.fromEntries(formData);

	addTask(data.task_text);
	updateTaskListElement();

	event.target.reset();
}

/**
 * Handles click events inside the task list.
 * @param {MouseEvent} event - The click event triggered by a user interaction.
 * @returns {void}
 */
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
			updateTaskListElement();
		} else if (event.target.classList.contains("cancel-edit-btn")) {
			updateTaskListElement();
		} else if (event.target.classList.contains("delete__btn")) {
			deleteTask(taskElement);
			updateTaskListElement();
		} else if (event.target.classList.contains("order__btn")) {
			createReorderTaskElement(taskElement);
		} else if (event.target.classList.contains("save-reorder-btn")) {
			const prev_num = taskElement.dataset.num;
			const new_num = taskElement.querySelector(".edit__num").value;
			updateTaskListElement(saveTasksOrder(prev_num, new_num));
		} else if (event.target.classList.contains("cancel-reorder-btn")) {
			updateTaskListElement();
		}
	}
}

//EVENT LISTENERS
form.addEventListener("submit", formHandler);
taskList.addEventListener("click", taskClickHandler);
updateTaskListElement();
