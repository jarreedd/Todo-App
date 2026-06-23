import { tasks, saveTasks } from "./tasks.js";
import { moveItem } from "../utils/moveItem.js";
import { updateTaskListElement } from "./main.js";
import { state } from "./data.js";
import { gotoHomePage } from "./taskViewing.js";

// CREATE TASK
/**
 * Creates the checkbox input element for a task item.
 * @param {boolean} isChecked - Whether the task checkbox is initially checked.
 * @returns {HTMLInputElement} The checkbox input element.
 */
function createCheckboxElement(isChecked) {
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = isChecked;
	checkbox.className = "uncheckedbox";

	return checkbox;
}

/**
 * Creates a custom checkbox label element for task completion toggle.
 * @returns {HTMLLabelElement} The label element used as a custom checkbox.
 */
function createCustomCheckedboxElement() {
	const custom_checkedbox = document.createElement("label");
	custom_checkedbox.className = "custom-checkedbox";
	custom_checkedbox.innerHTML = /** icon svg */ `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M16.8 8.40002L9.64043 15.6L7.19995 13.1457" 
                stroke="black" stroke-width="2" stroke-linecap="roun stroke-linejoin="round"
            />
        </svg>
    `;

	return custom_checkedbox;
}

/**
 * Creates the text label for a task item.
 * @param {string} text - The task text to display.
 * @returns {HTMLLabelElement} The task text label element.
 */
function createTaskTextElement(text) {
	const task_text = document.createElement("label");
	task_text.className = "task__text";
	task_text.innerText = text;

	return task_text;
}

function gotoTaskPage(event) {
	const index = event.target.parentElement.dataset.index;

	location.href = `../task.html#${index}`;
	event.target.removeEventListener(gotoTaskPage);
}

function createTaskOptionButtonElement() {
	const optionBtn = document.createElement("button");
	optionBtn.className = "icon_btn";
	optionBtn.classList.add("options__btn");
	optionBtn.innerHTML = /** icon svg */ `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
			<path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/>
		</svg>
    `;

	optionBtn.addEventListener("click", gotoTaskPage);

	return optionBtn;
}

/**
 * Creates the edit button used to enter task edit mode.
 * @returns {HTMLButtonElement} The edit button element.
 */
function createEditTaskButtonElement() {
	const edit_btn = document.createElement("button");
	edit_btn.className = "icon_btn";
	edit_btn.classList.add("edit__btn");
	edit_btn.innerHTML = /** icon svg */ `
		<svg width="24" height="24" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M181.518 21C184.214 21 186.884 21.5312 189.375 22.5635C191.71 23.5313 193.846 24.9215 195.674 26.6631L196.035 27.0166L213.033 44.1172C216.855 47.9605 219 53.1592 219 58.5781C219 63.9966 216.855 69.1949 213.034 73.0381L80.8057 205.656C79.5367 206.904 77.9506 207.782 76.2188 208.193L76.208 208.196L33.2344 218.936C32.4751 219.023 31.7081 219.021 30.9492 218.93L30.8291 218.915L30.709 218.93C29.951 219.021 29.1851 219.022 28.4268 218.936C27.1725 218.627 25.9916 218.073 24.9531 217.305C23.8999 216.525 23.0144 215.542 22.3496 214.413C21.6847 213.284 21.2536 212.032 21.083 210.733C20.9124 209.435 21.0057 208.115 21.3564 206.853L21.3623 206.827L32.1172 163.818L32.1182 163.819C32.5864 162.08 33.4972 160.491 34.7637 159.21L34.7646 159.211L167 27.0166C168.906 25.1094 171.169 23.5958 173.66 22.5635C176.151 21.5313 178.821 21 181.518 21ZM148.478 73.0381L50.6729 170.92L50.4775 171.115L50.4102 171.383L44.708 194.079L44.3027 195.691L45.917 195.293L68.6191 189.7L68.8906 189.634L69.0869 189.437L167 91.5547L167.707 90.8467L167 90.1396L149.892 73.0371L149.185 72.3301L148.478 73.0381ZM180.754 40.7705L163.754 57.873L163.054 58.5781L163.754 59.2832L180.754 76.3857L181.461 77.0967L182.171 76.3877L199.278 59.2852L199.985 58.5781L199.278 57.8711L182.171 40.7686L181.461 40.0596L180.754 40.7705Z" fill="black" stroke="black" stroke-width="2"/>
		</svg>
    `;

	return edit_btn;
}

/**
 * Creates the delete button for a task item.
 * @returns {HTMLButtonElement} The delete button element.
 */
function createDeleteTaskButtonElement() {
	const delete_btn = document.createElement("button");
	delete_btn.className = "icon_btn";
	delete_btn.classList.add("delete__btn");
	delete_btn.innerHTML = /** icon svg */ `
        <svg width="24" height="24" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M153.333 10H86.6667C74.4111 10 64.4444 19.867 64.4444 32V54H20V76H42.2222V208C42.2222 220.133 52.1889 230 64.4444 230H175.556C187.811 230 197.778 220.133 197.778 208V76H220V54H175.556V32C175.556 19.867 165.589 10 153.333 10ZM86.6667 32H153.333V54H86.6667V32ZM175.556 208H64.4444V76H175.556V208Z" fill="black"/>
		</svg>
    `;
	return delete_btn;
}

export function createGrabIconElement() {
	const grab_icon = document.createElement("span");
	grab_icon.className = "grab-icon icon_btn";
	grab_icon.innerHTML = /** icon svg */ `
		<svg width="24" height="24" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="40" cy="80" r="20" stroke="black" stroke-width="20"/>
			<circle cx="200" cy="80" r="20" stroke="black" stroke-width="20"/>
			<circle cx="40" cy="160" r="20" stroke="black" stroke-width="20"/>
			<circle cx="120" cy="80" r="20" stroke="black" stroke-width="20"/>
			<circle cx="200" cy="160" r="20" stroke="black" stroke-width="20"/>
			<circle cx="120" cy="160" r="20" stroke="black" stroke-width="20"/>
		</svg>
	`;
	return grab_icon;
}

/**
 * Creates a list item element representing a task with interactive elements.
 * @param {Object} task - Task data including index, num, isChecked, and text.
 * @param {number} task.index - Unique task identifier for dataset attributes.
 * @param {number} task.num - Identifier for checkbox and label IDs.
 * @param {boolean} task.isChecked - Indicates if the task is completed.
 * @param {string} task.text - The task's description.
 * @returns {HTMLLIElement} The constructed task list item element.
 */
export function createTaskElement(task) {
	const { index, num, isChecked, text } = task;
	// create task
	const li = document.createElement("li");
	li.className = "task";
	li.dataset.index = index;
	li.dataset.num = num;

	const checkboxElement = createCheckboxElement(isChecked);
	checkboxElement.id = `task_${num}`;
	checkboxElement.dataset.index = index;

	const custom_checkedbox = createCustomCheckedboxElement();
	custom_checkedbox.setAttribute("for", `task_${num}`);
	custom_checkedbox.dataset.index = index;

	const task_text = createTaskTextElement(text);
	task_text.setAttribute("for", `task_${num}`);
	task_text.dataset.index = index;

	// const edit_btn = createEditTaskButtonElement();
	// const delete_btn = createDeleteTaskButtonElement();

	const taskOption_btn = createTaskOptionButtonElement();

	li.appendChild(checkboxElement);
	li.appendChild(custom_checkedbox);
	li.appendChild(task_text);
	li.appendChild(taskOption_btn);
	// li.appendChild(edit_btn);
	// li.appendChild(delete_btn);

	return li;
}

/**
 * Adds a new task to the in-memory task list and saves it.
 * @param {string} content - The text content for the new task.
 * @returns {void}
 */
export function addTask(content) {
	const task = {
		text: content,
		isChecked: false,
		index: tasks.length,
		num: tasks.length + 1,
	};

	tasks.push(task);
	saveTasks(tasks);
}

// EDIT TASK
/**
 * Creates a text input element pre-populated with the existing task text.
 * @param {string} prev_text - The current text of the task.
 * @returns {HTMLInputElement} The edit input element.
 */
function createEditTextInputElement(prev_text) {
	const edit_text = document.createElement("input");
	edit_text.type = "text";
	edit_text.className = "edit__text";
	edit_text.value = prev_text;
	edit_text.autocomplete = false;
	edit_text.required = true;

	return edit_text;
}

/**
 * Creates a save button for editing or reordering tasks.
 * @returns {HTMLButtonElement} The save button element.
 */
function createSavetButtonElement() {
	const saveBtnElement = document.createElement("button");
	saveBtnElement.className = "icon_btn";
	saveBtnElement.classList.add("save__btn");
	saveBtnElement.innerHTML = /** icon svg */ `
		<svg width="24" height="24" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M195 60L90 180L45 135" stroke="black" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	`;
	return saveBtnElement;
}

/**
 * Creates a cancel button for task edit and reorder forms.
 * @returns {HTMLButtonElement} The cancel button element.
 */
function createCancelButtonElement() {
	const cancelBtnElement = document.createElement("button");
	cancelBtnElement.className = "icon_btn";
	cancelBtnElement.classList.add("cancel__btn");
	cancelBtnElement.innerHTML = /** icon svg */ `
		<svg width="24" height="24" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M58.2539 45.5C61.6364 45.5 64.8806 46.8437 67.2725 49.2354L120 101.963L172.727 49.2363C175.118 46.8488 178.361 45.5088 181.74 45.5117C185.12 45.5147 188.36 46.8603 190.747 49.252C193.06 51.569 194.39 54.6842 194.468 57.9492L194.472 58.2656C194.469 61.6451 193.123 64.8849 190.731 67.2725L138.004 120L138.357 120.354L190.765 172.728C193.156 175.119 194.5 178.364 194.5 181.746C194.5 185.129 193.156 188.373 190.765 190.765C188.373 193.156 185.129 194.5 181.746 194.5C178.364 194.5 175.119 193.156 172.728 190.765L120 138.037L67.2725 190.765C64.8806 193.156 61.6364 194.5 58.2539 194.5C54.8714 194.5 51.6272 193.156 49.2354 190.765C46.8435 188.373 45.5001 185.129 45.5 181.746C45.5 178.364 46.8437 175.119 49.2354 172.728L101.963 120L49.2354 67.2725C46.8437 64.8806 45.5 61.6364 45.5 58.2539C45.5001 54.8714 46.8435 51.6272 49.2354 49.2354C51.6272 46.8435 54.8714 45.5001 58.2539 45.5Z" fill="black" stroke="black"/>
		</svg>

	`;
	return cancelBtnElement;
}

/**
 * Transforms a task list item into an edit form.
 * @param {HTMLElement} taskElement - The task list item element to convert.
 * @returns {void}
 */
export function createEditTaskElement(taskElement) {
	let index = taskElement.dataset.index;
	let prev_text = tasks[index].text; // args for func should be task element and tasks array

	const edit_text = createEditTextInputElement(prev_text);

	const save_btn = createSavetButtonElement();
	save_btn.classList.add("save-edit-btn");

	const cancel_btn = createCancelButtonElement();
	cancel_btn.classList.add("cancel-edit-btn");

	taskElement.classList.add("task__editing");
	taskElement.innerHTML = "";
	taskElement.appendChild(edit_text);
	taskElement.appendChild(save_btn);
	taskElement.appendChild(cancel_btn);
}

/**
 * Saves the edited task text back to the task store.
 * @param {HTMLElement} taskElement - The task list item containing the edited text.
 * @returns {void}
 */
export function saveEdit(taskElement) {
	const text = taskElement.querySelector(".edit__text").value;
	const index = taskElement.dataset.index;
	tasks[index].text = text;

	saveTasks(tasks);
}

// REORDER TASK
/**
 * Reorders the tasks array and reassigns index and num values.
 * @param {number} prev_index - zero-based source position of the task to move.
 * @param {number} new_index - zero-based destination position for the task.
 * @returns {Array<Object>} The reordered task list.
 */
export function saveTasksOrder(prev_index, new_index) {
	const new_tasks_order = moveItem(tasks, prev_index, new_index);
	new_tasks_order.forEach((task, index) => {
		task.index = index;
		task.num = index + 1;
	});
	saveTasks(new_tasks_order);
	return new_tasks_order;
}

/**
 * Removes a task from the list and updates indices for remaining tasks.
 * @param {HTMLElement} taskElement - The DOM element representing the task to delete.
 * @returns {void}
 */
export function deleteTask(event) {
	let index = event.target.dataset.index;
	tasks.splice(index, 1); // Mutates tasks array, dont need old structure

	// DO NOT USE array.splice() WHEN THE PREVIOUS VERSION
	// OF array ,BEFORE MUTATION, HAS TO BE USED AGAIN

	// Handles mutation by rearrange index and tasks nums
	tasks.forEach((task, index) => {
		task.index = index;
		task.num = index + 1;
	});
	saveTasks(tasks);
	gotoHomePage();
}
