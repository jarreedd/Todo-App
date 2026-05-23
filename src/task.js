import { tasks, saveTasks } from "./tasks.js";

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
	// create task
	const li = document.createElement("li");
	li.className = "task";
	li.dataset.index = task.index;

	// create checkboxes
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.id = `task_${task.num}`;
	checkbox.checked = task.isChecked;
	checkbox.dataset.index = task.index;
	li.appendChild(checkbox);

	const custom_checkbox = document.createElement("label");
	custom_checkbox.className = "custom-checkbox";
	custom_checkbox.setAttribute("for", `task_${task.num}`);
	custom_checkbox.innerHTML = /** icon svg */ `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M16.8 8.40002L9.64043 15.6L7.19995 13.1457" 
                stroke="black" stroke-width="2" stroke-linecap="roun stroke-linejoin="round"
            />
        </svg>
    `;
	li.appendChild(custom_checkbox);

	// create task text
	const task_text = document.createElement("label");
	task_text.className = "task__text";
	task_text.setAttribute("for", `task_${task.num}`);
	task_text.innerText = task.text;
	li.appendChild(task_text);

	// create edit task button
	const edit_btn = document.createElement("button");
	edit_btn.className = "icon-btn";
	edit_btn.classList.add("edit__btn");
	edit_btn.innerHTML = /** icon svg */ `
        
		<svg width="24" height="24" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M181.518 21C184.214 21 186.884 21.5312 189.375 22.5635C191.71 23.5313 193.846 24.9215 195.674 26.6631L196.035 27.0166L213.033 44.1172C216.855 47.9605 219 53.1592 219 58.5781C219 63.9966 216.855 69.1949 213.034 73.0381L80.8057 205.656C79.5367 206.904 77.9506 207.782 76.2188 208.193L76.208 208.196L33.2344 218.936C32.4751 219.023 31.7081 219.021 30.9492 218.93L30.8291 218.915L30.709 218.93C29.951 219.021 29.1851 219.022 28.4268 218.936C27.1725 218.627 25.9916 218.073 24.9531 217.305C23.8999 216.525 23.0144 215.542 22.3496 214.413C21.6847 213.284 21.2536 212.032 21.083 210.733C20.9124 209.435 21.0057 208.115 21.3564 206.853L21.3623 206.827L32.1172 163.818L32.1182 163.819C32.5864 162.08 33.4972 160.491 34.7637 159.21L34.7646 159.211L167 27.0166C168.906 25.1094 171.169 23.5958 173.66 22.5635C176.151 21.5313 178.821 21 181.518 21ZM148.478 73.0381L50.6729 170.92L50.4775 171.115L50.4102 171.383L44.708 194.079L44.3027 195.691L45.917 195.293L68.6191 189.7L68.8906 189.634L69.0869 189.437L167 91.5547L167.707 90.8467L167 90.1396L149.892 73.0371L149.185 72.3301L148.478 73.0381ZM180.754 40.7705L163.754 57.873L163.054 58.5781L163.754 59.2832L180.754 76.3857L181.461 77.0967L182.171 76.3877L199.278 59.2852L199.985 58.5781L199.278 57.8711L182.171 40.7686L181.461 40.0596L180.754 40.7705Z" fill="black" stroke="black" stroke-width="2"/>
</svg>


    `;
	li.appendChild(edit_btn);

	// create task delete button
	const delete_btn = document.createElement("button");
	delete_btn.className = "icon-btn";
	delete_btn.classList.add("delete__btn");
	delete_btn.innerHTML = /** icon svg */ `
        <svg width="24" height="24" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M153.333 10H86.6667C74.4111 10 64.4444 19.867 64.4444 32V54H20V76H42.2222V208C42.2222 220.133 52.1889 230 64.4444 230H175.556C187.811 230 197.778 220.133 197.778 208V76H220V54H175.556V32C175.556 19.867 165.589 10 153.333 10ZM86.6667 32H153.333V54H86.6667V32ZM175.556 208H64.4444V76H175.556V208Z" fill="black"/>
</svg>

    `;
	li.appendChild(delete_btn);

	return li;
}

export function editTask(taskElement) {
	let index = taskElement.getAttribute("data-index");

	const edit_text = document.createElement("input");
	edit_text.type = "text";
	edit_text.className = "edit__text";
	edit_text.value = tasks[index].text; // args for func should be task element and tasks array
	edit_text.autocomplete = false;
	edit_text.required = true;

	// create save task edit button
	const save_btn = document.createElement("button");
	save_btn.className = "icon-btn";
	save_btn.classList.add("save__btn");
	save_btn.innerHTML = /** icon svg */ `
		<svg width="24" height="24" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M195 60L90 180L45 135" stroke="black" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

	`;

	// create cancel task edit button
	const cancel_btn = document.createElement("button");
	cancel_btn.className = "icon-btn";
	cancel_btn.classList.add("cancel__btn");
	cancel_btn.innerHTML = /** icon svg */ `
		<svg width="24" height="24" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M58.2539 45.5C61.6364 45.5 64.8806 46.8437 67.2725 49.2354L120 101.963L172.727 49.2363C175.118 46.8488 178.361 45.5088 181.74 45.5117C185.12 45.5147 188.36 46.8603 190.747 49.252C193.06 51.569 194.39 54.6842 194.468 57.9492L194.472 58.2656C194.469 61.6451 193.123 64.8849 190.731 67.2725L138.004 120L138.357 120.354L190.765 172.728C193.156 175.119 194.5 178.364 194.5 181.746C194.5 185.129 193.156 188.373 190.765 190.765C188.373 193.156 185.129 194.5 181.746 194.5C178.364 194.5 175.119 193.156 172.728 190.765L120 138.037L67.2725 190.765C64.8806 193.156 61.6364 194.5 58.2539 194.5C54.8714 194.5 51.6272 193.156 49.2354 190.765C46.8435 188.373 45.5001 185.129 45.5 181.746C45.5 178.364 46.8437 175.119 49.2354 172.728L101.963 120L49.2354 67.2725C46.8437 64.8806 45.5 61.6364 45.5 58.2539C45.5001 54.8714 46.8435 51.6272 49.2354 49.2354C51.6272 46.8435 54.8714 45.5001 58.2539 45.5Z" fill="black" stroke="black"/>
</svg>

	`;

	taskElement.classList.add("task__editing");
	taskElement.innerHTML = "";
	taskElement.appendChild(edit_text);
	taskElement.appendChild(save_btn);
	taskElement.appendChild(cancel_btn);
}

export function saveEdit(taskElement) {
	const text = taskElement.querySelector(".edit__text").value;
	const index = taskElement.getAttribute("data-index");
	tasks[index].text = text;

	saveTasks(tasks);
}
