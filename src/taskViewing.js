import { html, state } from "./data.js";
import { tasks } from "./tasks.js";
import { deleteTask } from "./task.js";

export function gotoHomePage(event) {
	location.href = "../index.html";
}

window.addEventListener("load", (event) => {
	state.viewing = window.location.pathname === "/task.html";

	if (!state.viewing) return;

	const index = location.hash.slice(1);
	const task = tasks[index];
	const { isChecked, text, num } = task;

	html.task.button.delete.dataset.index = index;

	html.task.text.textContent = text;

	if (isChecked) {
		html.task.from.options.value = "completed";
	} else {
		html.task.from.options.value = "not started";
	}

	// EVENT LISTENERS
	html.task.button.back.addEventListener("click", gotoHomePage);
	html.task.button.delete.addEventListener("click", deleteTask);
});
