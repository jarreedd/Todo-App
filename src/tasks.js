import { createTaskElement } from "./task.js";

export let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

export function addTask(content) {
	// update state
	const task = {
		text: content,
		isChecked: false,
		index: tasks.length,
		num: tasks.length + 1,
	};

	tasks.push(task);
	saveTasks(tasks);
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
}

export function deleteTask(taskElement) {
	// update state
	let index = taskElement.getAttribute("data-index");
	tasks.splice(index, 1);

	tasks.forEach((task, index) => {
		task.index = index;
		task.num = index + 1;
	});
	saveTasks(tasks);
}
