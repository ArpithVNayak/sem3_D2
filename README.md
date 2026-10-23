# Student Task Manager

A mini project built with HTML, CSS and JavaScript.

## Files
- `index.html` — page structure and controls
- `style.css` — layout, colours, spacing and responsive design
- `script.js` — add, delete, complete, search, filter and Local Storage logic

## How to run
1. Extract `student_task_manager.zip` into a folder.
2. Open the `student_task_manager` folder.
3. Double-click `index.html` to open it in Chrome, Edge or Firefox.
4. Type a task and click **+ Add Task**.
5. Try completing, deleting, searching and filtering tasks.
6. Refresh the page: your tasks should still be there.

No server or installation is required.

## Requirements covered
- User-friendly, centered interface (maximum width 600px)
- Task input and Add Task button on one row on larger screens
- Empty-input validation
- Dynamically updated task list
- Delete button for each task
- Checkbox to mark a task completed or pending
- Completed tasks shown in grey with strikethrough
- Search box
- All, Pending and Completed filters
- Local Storage persistence across refreshes
- Button hover and keyboard focus styles
- Responsive layout for smaller screens

## Main JavaScript functions
- `addTask(title)` — validates and adds a task
- `deleteTask(id)` — removes a task by ID
- `toggleTask(id)` — changes completed status
- `displayTasks()` — redraws the visible task list and counters
- `searchTasks(taskArray)` — searches task titles
- `filterTasks(taskArray)` — filters by completion status
- `saveTasks()` — stores tasks in Local Storage
- `loadTasks()` — restores saved tasks

## Viva / explanation
The tasks are stored in an array of objects. Each object contains an `id`, `title`, and `completed` value. JavaScript event listeners respond to form submission, checkbox changes, deletion, search input and filter changes. `JSON.stringify()` converts the array to text for Local Storage, while `JSON.parse()` converts it back when the page loads. CSS styles the page and visually distinguishes completed tasks.
