import { updateTaskListElement, state } from "../src/script.js";
import { saveTasksOrder } from "../src/task.js";

let dragStartIndex;
let dragEndIndex;

export function dragStart(event) {
	dragStartIndex = +this.closest("li").dataset.index;
	this.classList.add("dragging");
}

export function dragOver(event) {
	event.preventDefault();
}

export function dragDrop(event) {
	dragEndIndex = +this.dataset.index;
	updateTaskListElement(saveTasksOrder(dragStartIndex, dragEndIndex));
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

export function dragEnd(event) {
	updateTaskListElement();
}
