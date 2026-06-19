export const sortOptions = ["custom", "A-Z", "Z-A"];

export let state = {
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
	},
	tasks: {
		list: document.querySelector(".tasks-list"),
	},
};
/**
 * @param {string} className
 */
export function getElements(className) {
	return document.getElementsByClassName(className);
}
