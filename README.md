# Todo-App

A lightweight task manager built with HTML, CSS, and vanilla JavaScript for adding, editing, deleting, completing and reordering tasks. Tasks are saved in `localStorage`, so your list stays available after you refresh the page.

[![Netlify Status](https://api.netlify.com/api/v1/badges/fedaf3fb-c719-4c3b-ae3d-56f66ac349aa/deploy-status)](https://app.netlify.com/sites/reeddev-todo/deploys)
**Link:** [todo-reedwebdev.netlify.app](https://todo-reedwebdev.netlify.app/)

<div style="display:grid; grid-template-columns:repeat(2,1fr);gap:8px">
<img src="img/image2.png"><img src="img/image3.png"><img src="img/image4.png"><img src="img/image5.png">
</div>



## ✅ Features

- Add, edit, and delete tasks
- Mark tasks as completed
- Reorder tasks with drag and drop
- Persist tasks in `localStorage`

## 🚀 Getting Started

### Run locally

1. Clone the repository.
2. Open `index.html` in your browser.

### Development

- No build tools are required.
- Modify the HTML, CSS, or JavaScript files.
- Refresh the browser to see updates.

## 📁 Project Structure

- `index.html` — application entry point
- `style.css` — styles for the app interface
- `src/script.js` — main application logic and event handling
- `src/task.js` — task creation, editing, deletion, and reordering behavior
- `src/tasks.js` — task storage and rendering utilities
- `utils/moveItem.js` — helper for task reordering
- `utils/drag.js` — helpers for drag-and-drop reordering

## 🔧 Future Improvements

- Select multiple tasks for delete or archive
- Dates created and Due dates
- Categories and tags
- Order by name, category, due- and creation- date
- Task filtering by category
- Subtasks support
- Backend sync and authentication

## 📌 Contribution

Contributions are welcome. Open issues or submit pull requests for improvements.

## 💡 Notes

Update `style.css` with proper attributes. Create a naming guideline for styles and query selectors, using classes for styling and ids or dataset attributes for querying.
