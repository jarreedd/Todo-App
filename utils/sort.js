import { state, sortOptions } from "../src/script.js";

function createSortingFromElement() {
	const formElement = document.createElement("form");
	formElement.className = "sort_form";
	formElement.id = "sort_form";

	const labelElement = document.createElement("label");
	labelElement.className = "sort_label";
	labelElement.htmlFor = "sort_options";
	labelElement.textContent = "Sort by:";

	const selectElement = document.createElement("select");
	selectElement.name = "sort_options";
	selectElement.id = "sort_options";
	selectElement.className = "sort_options";

	sortOptions.forEach((option) => {
		const optionElement = document.createElement("option");
		optionElement.value = option;
		optionElement.textContent = option;
		selectElement.appendChild(optionElement);
	});

	const doneBtnElement = document.createElement("button");
	doneBtnElement.setAttribute("type", "submit");
	doneBtnElement.id = "done-sorting_btn";
	doneBtnElement.className = "done-sorting_btn btn";
	doneBtnElement.textContent = "Done";

	formElement.appendChild(labelElement);
	formElement.appendChild(selectElement);
	formElement.appendChild(doneBtnElement);

	return formElement;
}

export function sort(event) {
	state.sorting = true;
	event.target.parentElement.appendChild(createSortingFromElement());
	event.target.remove();
}

export function createSortBtnElement() {
	const sortBtnElement = document.createElement("button");
	sortBtnElement.id = "sort_btn";
	sortBtnElement.className = "sort_btn btn";
	sortBtnElement.textContent = "Sort";
	sortBtnElement.addEventListener("click", sort);
	return sortBtnElement;
}
