export const sortOptions = ["custom", "A-Z", "Z-A"];

export let state = {
	viewing: false,
	sorting: false,
	dragging: false,
};

/**
 * An object literal that contains references to all the HTML elements
 * referenced through the operation of the app either upon initialisation or
 * while its running (via event listeners). This ensure that all UI elements can
 * be accessed and seen in a structured manner in a single data structure.
 */
export const html = {
	main: {
		header: document.getElementById("main_header"),
		backdrop: document.getElementById("backdrop"),
	},
	tasks: {
		list: document.querySelector(".tasks-list"),
	},
	add: {
		tab: document.getElementById("add_tab"),
		toggle: document.getElementById("toggle_btn"),
		form: document.getElementById("add_form"),
		button: {
			add: document.getElementById("add_btn"),
			cancel: document.getElementById("cancel_btn"),
		},
	},
	task: {
		text: document.getElementById("task_text"),
		button: {
			edit: document.getElementById("edit_btn"),
			back: document.getElementById("back_btn"),
			delete: document.getElementById("delete_btn"),
		},
		from: {
			status: document.getElementById("status_form"),
			options: document.getElementById("status_options"),
		},
		date: {
			created: document.querySelector(".date_created .date"),
		},
	},
};
/**
 * @param {string} className
 */
export function getElements(className) {
	return document.getElementsByClassName(className);
}
