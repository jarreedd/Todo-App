import { tasks, updateTasks, createTasksElements, saveTasks } from "./tasks.js";
import {
	addTask,
	createEditTaskElement,
	saveEdit,
	deleteTask,
	saveTasksOrder,
	createGrabIconElement,
} from "./task.js";

import { sort, createSortBtnElement } from "./utils/sort.js";

export const sortOptions = ["custom", "A-Z", "Z-A"];

export let state = {
	sorting: false,
	dragging: false,
};

// DOM ELEMENTS

const mainHeaderElement = document.getElementById("main_header");

/**
 * The list container where task items are rendered.
 * @type {HTMLUListElement | null}
 */
const taskList = document.querySelector(".tasks-list");

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
export function updateTaskListElement(newTasksArray, mode) {
	newTasksArray && updateTasks(newTasksArray);
	taskList.innerHTML = "";
	taskList.appendChild(createTasksElements(tasks));

	if (mode === "sorting") {
		const taskElements = document.getElementsByClassName("task");
		for (const element of taskElements) {
			element.appendChild(createGrabIconElement());
			element.querySelector(".options__btn").remove();
		}
	}
}

/**
 * Handles task form submission and adds a new task.
 * @param {SubmitEvent} event - The submit event from the add-task form.
 * @returns {void}
 */
function addTaskFormHandler(event) {
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
		const taskElement = event.target.closest("li");

		let classList = event.target.classList;
		classList.forEach((item) => {
			switch (item) {
				case "edit__btn":
					createEditTaskElement(taskElement);
					break;
				case "save-edit-btn":
					saveEdit(taskElement);
					updateTaskListElement();
					break;
				case "cancel-edit-btn":
					updateTaskListElement();
					break;
				case "delete__btn":
					deleteTask(taskElement);
					updateTaskListElement();
					break;
			}
		});
	}
}

taskList.addEventListener("mousedown", (event) => {
	if (
		event.target.closest("span") &&
		event.target.closest("span").classList.contains("grab-icon")
	) {
		state.dragging = true;
		event.target.closest("li").draggable = true;

		const taskElements = document.getElementsByClassName("task");
		for (const taskElement of taskElements) {
			const taskNumber = taskElement.dataset.num;
			const taskIndex = taskElement.dataset.index;

			taskElement.innerHTML = "";
			taskElement.classList.add("task_order");
			taskElement.textContent = `TASK ${taskNumber}: ${tasks[taskIndex].text}`;
		}
	}
});

updateTaskListElement();
mainHeaderElement.appendChild(createSortBtnElement());

//EVENT LISTENERS
taskList.addEventListener("click", taskClickHandler);

document.addEventListener("mouseup", (event) => {
	if (state.dragging) {
		updateTaskListElement();
		state.dragging = false;
	}
});

document.addEventListener("submit", (event) => {
	event.preventDefault();
	const submitter = event.submitter;
	console.log(submitter);

	if (event.target.classList.contains("sort_form")) {
		state.sorting = false;
		event.target.parentElement.appendChild(createSortBtnElement());
		event.target.remove();
		updateTaskListElement();
	}

	if (event.target.classList.contains("add_form")) {
		addTaskFormHandler(event);
	}
});
