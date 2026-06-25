import { sortOptions, state, html, getElements } from "./data.js";
import { tasks, updateTasks, createTasksElements, saveTasks } from "./tasks.js";
import {
	addTask,
	saveTextEdit,
	saveTasksOrder,
	createGrabIconElement,
} from "./task.js";
import { sort, createSortBtnElement } from "../utils/sort.js";

/**
 * Updates the task list by optionally replacing the task data and rerendering the task list.
 * @param {Array<Object>} [newTasksArray] - Optional new task array to replace current tasks.
 * @returns {void}
 */
export function updateTaskListElement(newTasksArray, mode) {
	newTasksArray && updateTasks(newTasksArray);
	html.tasks.list.innerHTML = "";
	html.tasks.list.appendChild(createTasksElements(tasks));

	if (mode === "sorting") {
		for (const element of getElements("task")) {
			element.appendChild(createGrabIconElement());
			element.querySelector(".options_btn").remove();
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
	if (
		event.target.tagName === "LI" ||
		event.target.classList.contains("custom_checkedbox") ||
		event.target.classList.contains("uncheckedbox")
	) {
		let index = event.target.dataset.index;
		tasks[index].isChecked = tasks[index].isChecked ? false : true;
		saveTasks(tasks);
	}
}

function toggleAddTab(event) {
	html.main.backdrop.classList.toggle("active");
	html.add.tab.classList.toggle("active");
	html.add.form.classList.toggle("active");
}

function mouseDownHandler(event) {
	if (
		event.target.closest("span") &&
		event.target.closest("span").classList.contains("grab_icon")
	) {
		state.dragging = true;
		event.target.closest("li").draggable = true;

		for (const taskElement of getElements("task")) {
			const taskNumber = taskElement.dataset.num;
			const taskIndex = taskElement.dataset.index;

			taskElement.innerHTML = "";
			taskElement.classList.add("task_order");
			taskElement.textContent = `TASK ${taskNumber}: ${tasks[taskIndex].text}`;
		}
	}
}

function mouseUpHandler(event) {
	if (state.dragging) {
		updateTaskListElement();
		state.dragging = false;
	}
}

function submitHandler(event) {
	event.preventDefault();
	const submitter = event.submitter;

	if (event.target.classList.contains("sort_form")) {
		state.sorting = false;
		event.target.parentElement.appendChild(createSortBtnElement());
		event.target.remove();
		updateTaskListElement();
	}

	if (event.target.classList.contains("add_form")) {
		addTaskFormHandler(event);
		toggleAddTab();
	}
}

window.addEventListener("load", (event) => {
	state.viewing = window.location.pathname === "/task.html";
	if (state.viewing) return;

	updateTaskListElement();
	html.main.header.appendChild(createSortBtnElement());

	//EVENT LISTENERS
	html.tasks.list.addEventListener("click", taskClickHandler);
	html.add.toggle.addEventListener("click", toggleAddTab);
	html.add.button.cancel.addEventListener("click", toggleAddTab);
	html.main.backdrop.addEventListener("click", toggleAddTab);
	html.tasks.list.addEventListener("mousedown", mouseDownHandler);
	document.addEventListener("mouseup", mouseUpHandler);
	document.addEventListener("submit", submitHandler);
});
