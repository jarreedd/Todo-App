import { html, state } from "./data.js";
import { tasks, saveTasks } from "./tasks.js";
import { deleteTask, createEditTaskElement, saveTextEdit } from "./task.js";

let index;

function saveUpdates() {
	const form = html.task.from.status;
	const formData = new FormData(form);
	const data = Object.fromEntries(formData);
	tasks[index].isChecked = data.status_options === "completed";
	saveTasks(tasks);
}

export function gotoHomePage(event) {
	if (event.target.classList.contains("back_btn")) saveUpdates();

	location.href = "/";
}

function createTaskViewElement(text) {
	const fragment = document.createDocumentFragment();
	const taskText = document.createElement("p");
	taskText.id = "task_text";
	taskText.className = "task_text";

	taskText.textContent = text;

	const toggleEditBtn = document.createElement("button");
	toggleEditBtn.className = "edit_btn icon_btn";
	toggleEditBtn.innerHTML = /** icon svg */ `<i class="fa-solid fa-pen-to-square"></i>`;
	toggleEditBtn.addEventListener("click", toggleEditTask);

	fragment.appendChild(taskText);
	fragment.appendChild(toggleEditBtn);
	return fragment;
}

function toggleEditTask(event) {
	const taskRow = event.target.parentElement;
	event.target.removeEventListener("click", toggleEditTask);

	taskRow.classList.toggle("task_editing");
	const taskText = tasks[index].text;

	if (taskRow.classList.contains("task_editing")) {
		const fragment = createEditTaskElement(taskText);
		taskRow.replaceChildren(fragment);
	} else {
		const fragment = createTaskViewElement(taskText);
		taskRow.replaceChildren(fragment);
	}
}

window.addEventListener("load", (event) => {
	state.viewing = window.location.pathname === "/task.html";

	if (!state.viewing) return;

	index = new URLSearchParams(window.location.search).get("id");
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
	html.task.button.edit.addEventListener("click", toggleEditTask);

	html.task.heading.addEventListener("click", (event) => {
		let classList = event.target.classList;
		classList.forEach((item) => {
			switch (item) {
				case "save_edit_btn":
					const newText = document.getElementById("edit_text").value;
					saveTextEdit(newText, index);
					toggleEditTask(event);
					break;

				case "cancel_edit_btn":
					toggleEditTask(event);
					break;
			}
		});
	});
});
