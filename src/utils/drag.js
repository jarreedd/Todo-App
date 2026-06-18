import { updateTaskListElement, state } from "../script.js";
import { saveTasksOrder } from "../task.js";
import { tasks } from "../tasks.js";

let dragStartIndex;
let dragEndIndex;

export function dragStart(event) {
	dragStartIndex = +this.closest("li").dataset.index;
	this.classList.add("dragging");

	const taskElements = document.getElementsByClassName("task");
	for (const taskElement of taskElements) {
		const taskNumber = taskElement.dataset.num;
		const taskIndex = taskElement.dataset.index;

		taskElement.innerHTML = "";
		taskElement.classList.add("task_order");
		taskElement.textContent = `TASK ${taskNumber}: ${tasks[taskIndex].text}`;
	}
}

export function dragOver(event) {
	event.preventDefault();
}

export function dragDrop(event) {
	dragEndIndex = +this.dataset.index;
	updateTaskListElement(
		saveTasksOrder(dragStartIndex, dragEndIndex),
		"sorting",
	);
	state.dragging = false;
}
export function dragEnter(event) {
	event.preventDefault();
	this.classList.add("over");
}
export function dragLeave(event) {
	event.preventDefault();
	this.classList.remove("over");
}

export function dragEnd(event) {}
