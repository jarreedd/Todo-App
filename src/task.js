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
	custom_checkedbox.className = "custom_checkedbox";
	custom_checkedbox.innerHTML = /** icon svg */ `
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
	task_text.className = "task_text";
	task_text.innerText = text;

	return task_text;
}

function gotoTaskPage(event) {
	const index = event.target.parentElement.dataset.index;
	location.href = `/task.html?id=${index}`;
	event.target.removeEventListener(gotoTaskPage);
}

function createTaskOptionButtonElement() {
	const optionBtn = document.createElement("button");
	optionBtn.className = "icon_btn";
	optionBtn.classList.add("options_btn");
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
	edit_btn.classList.add("edit_btn");
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
	delete_btn.classList.add("delete_btn");
	delete_btn.innerHTML = /** icon svg */ `
        <svg width="24" height="24" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M153.333 10H86.6667C74.4111 10 64.4444 19.867 64.4444 32V54H20V76H42.2222V208C42.2222 220.133 52.1889 230 64.4444 230H175.556C187.811 230 197.778 220.133 197.778 208V76H220V54H175.556V32C175.556 19.867 165.589 10 153.333 10ZM86.6667 32H153.333V54H86.6667V32ZM175.556 208H64.4444V76H175.556V208Z" fill="black"/>
		</svg>
    `;
	return delete_btn;
}

export function createGrabIconElement() {
	const grab_icon = document.createElement("span");
	grab_icon.className = "grab_icon icon_btn";
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

	const taskOption_btn = createTaskOptionButtonElement();

	li.appendChild(checkboxElement);
	li.appendChild(custom_checkedbox);
	li.appendChild(task_text);
	li.appendChild(taskOption_btn);

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
 * @param {string} text - The current text of the task.
 * @returns {HTMLInputElement} The edit input element.
 */
function createEditTextInputElement(text) {
	const edit_text = document.createElement("input");
	edit_text.type = "text";
	edit_text.className = "edit_text";
	edit_text.id = "edit_text";
	edit_text.value = text;
	edit_text.autocomplete = false;
	edit_text.required = true;

	return edit_text;
}

/**
 * Creates a save button for editing or reordering tasks.
 * @returns {HTMLButtonElement} The save button element.
 */
function createSaveButtonElement() {
	const saveBtnElement = document.createElement("button");
	saveBtnElement.className = "icon_btn";
	saveBtnElement.classList.add("save_btn");
	saveBtnElement.innerHTML = /** icon svg */ `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700"><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
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
	cancelBtnElement.classList.add("cancel_btn");
	cancelBtnElement.innerHTML = /** icon svg */ `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M88 256L232 256C241.7 256 250.5 250.2 254.2 241.2C257.9 232.2 255.9 221.9 249 215L202.3 168.3C277.6 109.7 386.6 115 455.8 184.2C530.8 259.2 530.8 380.7 455.8 455.7C380.8 530.7 259.3 530.7 184.3 455.7C174.1 445.5 165.3 434.4 157.9 422.7C148.4 407.8 128.6 403.4 113.7 412.9C98.8 422.4 94.4 442.2 103.9 457.1C113.7 472.7 125.4 487.5 139 501C239 601 401 601 501 501C601 401 601 239 501 139C406.8 44.7 257.3 39.3 156.7 122.8L105 71C98.1 64.2 87.8 62.1 78.8 65.8C69.8 69.5 64 78.3 64 88L64 232C64 245.3 74.7 256 88 256z"/></svg>
	`;
	return cancelBtnElement;
}

/**
 * Transforms a task list item into an edit form.
 * @param {string} text - The current text of the task.
 * @returns {void}
 */
export function createEditTaskElement(text) {
	const fragment = document.createDocumentFragment();
	const edit_text = createEditTextInputElement(text);

	const save_btn = createSaveButtonElement();
	save_btn.classList.add("save_edit_btn");

	const cancel_btn = createCancelButtonElement();
	cancel_btn.classList.add("cancel_edit_btn");

	fragment.appendChild(edit_text);
	fragment.appendChild(save_btn);
	fragment.appendChild(cancel_btn);

	return fragment;
}

/**
 * Saves the edited task text back to the task store.
 * @param {string} newText - The new text of the task.
 * @param {number} index - Unique task identifier.
 * @returns {void}
 */
export function saveTextEdit(newText, index) {
	tasks[index].text = newText;
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

// DELETE TASK
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
	gotoHomePage(event);
}
