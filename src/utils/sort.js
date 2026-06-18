import { state, sortOptions } from "../script.js";
import { createGrabIconElement } from "../task.js";

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

export function createSortBtnElement() {
	const sortBtnElement = document.createElement("button");
	sortBtnElement.id = "sort_btn";
	sortBtnElement.className = "sort_btn btn";
	sortBtnElement.textContent = "Sort";
	sortBtnElement.addEventListener("click", sort);
	return sortBtnElement;
}

export function sort(event) {
	state.sorting = true;

	const sortingFromElement = createSortingFromElement();
	event.target.parentElement.appendChild(sortingFromElement);
	event.target.remove();

	const formData = new FormData(sortingFromElement);
	const data = Object.fromEntries(formData);
	let isCustom = data.sort_options === "custom";

	if (state.sorting && isCustom) {
		const taskElements = document.getElementsByClassName("task");
		for (const element of taskElements) {
			element.appendChild(createGrabIconElement());
			element.querySelector(".options__btn").remove();
		}
	}
}
