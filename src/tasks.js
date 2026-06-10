import { createTaskElement } from "./task.js";

/**
 * A list of task objects loaded from localStorage.
 * @type {Array<Object>}
 */
export const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/**
 * Replaces the contents of the shared tasks array with a new list.
 * @param {Array<Object>} newTasksArray - The new array of task objects.
 * @returns {void}
 */
export function updateTasks(newTasksArray) {
	tasks.splice(0);
	for (const task of newTasksArray) tasks.push(task);
}

/**
 * Creates a document fragment containing rendered task list items.
 * @param {Array<Object>} tasks - The task objects to render.
 * @returns {DocumentFragment} A fragment with task list item elements.
 */
export function createTasksElements(tasks) {
	const fragment = document.createDocumentFragment();

	for (const task of tasks) {
		const taskElement = createTaskElement(task);
		fragment.appendChild(taskElement);
	}

	return fragment;
}

/**
 * Persists tasks to localStorage.
 * @param {Array<Object>} tasks - The task objects to save.
 * @returns {void}
 */
export function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
	console.log("TASKS SAVED TO LOCALSTORAGE");
}
