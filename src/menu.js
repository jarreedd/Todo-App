import { html } from "./data.js";

function toggleMenu(event) {
	html.menu.tab.classList.toggle("active");
	html.menu.backdrop.classList.toggle("active");
}

html.menu.toggle.addEventListener("click", toggleMenu);
html.menu.close.addEventListener("click", toggleMenu);
html.menu.backdrop.addEventListener("click", toggleMenu);
