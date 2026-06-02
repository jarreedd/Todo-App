import { createTaskElement } from "./task.js";

export let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/**
 *
 * @param {Array} newTasksArray
 */
export function updateTasks(newTasksArray) {
	tasks.splice(0); // Clear task list
	newTasksArray.forEach((task) => tasks.push(task));
}

/**
 * Creates a document fragment containing multiple task elements.
 * @param {[]} tasks - An array of task objects to be rendered.
 * @returns {DocumentFragment} A document fragment containing all task list item elements.
 */
export function createTasksElements(tasks) {
	let fragment = document.createDocumentFragment();

	tasks.forEach((task) => {
		const taskElement = createTaskElement(task);
		fragment.appendChild(taskElement);
	});

	return fragment;
}

/**
 * Saves an array of tasks to localStorage.
 * @param {[]} tasks - The array of task objects to save.
 */
export function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
	console.log("TASKS SAVED TO LOCALSTORAGE");
}
