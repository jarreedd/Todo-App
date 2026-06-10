# Todo-App

A lightweight task manager built with HTML, CSS, and vanilla JavaScript (for educational porpuses)

This app lets users add, edit, delete, and complete tasks while persisting data in local storage.

[![Netlify Status](https://api.netlify.com/api/v1/badges/fedaf3fb-c719-4c3b-ae3d-56f66ac349aa/deploy-status)](https://app.netlify.com/sites/reeddev-todo/deploys)

![alt text](img/image1.png)

## ✅ Features

- Add, edit, and delete tasks
- Mark tasks as completed
- Persist tasks using `localStorage`
- Reorder tasks via numeric position input

## 🚀 Getting Started

### Run locally

1. Clone the repository.
2. Open `index.html` in your browser.

### Development

- No build tools are required.
- Modify HTML, CSS, or JavaScript files.
- Refresh the browser to see updates.

## 📁 Project Structure

- `index.html` — application entry point
- `style.css` — styling for the app interface
- `src/script.js` — main application logic and event handling
- `src/task.js` — task creation, editing, deletion, and reorder behavior
- `src/tasks.js` — task storage and rendering utilities
- `utils/moveItem.js` — helper for task reordering

## 💡 Notes

- Editing and reordering should not be allowed simultaneously, that needs to be fixed.

## 🔧 Future Improvements

- Drag-and-drop task reordering
- Due dates and reminders
- Categories and tags
- Filter tasks by category or due date
- Subtasks support
- Backend sync and authentication

## 📌 Contribution

Contributions are welcome. Open issues or submit pull requests for improvements.

## Reminder:

Change style.css with proper attributes; create naming guideline/naming convention (class for style and ids or dataset attributes for querying)