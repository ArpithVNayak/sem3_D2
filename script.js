// Student Task Manager - task data and functions

const STORAGE_KEY = "studentTaskManagerTasks";

let tasks = loadTasks();
let currentFilter = "all";
let currentSearch = "";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const message = document.getElementById("message");
const emptyState = document.getElementById("emptyState");
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");
const footerText = document.getElementById("footerText");
const clearCompletedButton = document.getElementById("clearCompleted");

// Load saved tasks from Local Storage when the page starts.
function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    console.error("Could not load saved tasks:", error);
    return [];
  }
}

// Save the current task list in the browser.
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    message.textContent = "Tasks could not be saved. Check your browser storage settings.";
    console.error("Could not save tasks:", error);
  }
}

// Add a new task after checking that the input is not empty.
function addTask(title) {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    message.textContent = "Please enter a task before adding it.";
    taskInput.focus();
    return;
  }

  tasks.unshift({
    id: Date.now() + Math.floor(Math.random() * 1000),
    title: cleanTitle,
    completed: false
  });

  saveTasks();
  displayTasks();
  taskInput.value = "";
  message.textContent = "Task added successfully.";
  taskInput.focus();
}

// Delete a task by its unique ID.
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  displayTasks();
  message.textContent = "Task deleted.";
}

// Mark a task as completed or pending.
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  displayTasks();
}

// Search tasks by their title.
function searchTasks(taskArray) {
  const searchText = currentSearch.trim().toLowerCase();
  if (!searchText) return taskArray;

  return taskArray.filter(task =>
    task.title.toLowerCase().includes(searchText)
  );
}

// Filter tasks by all, pending, or completed status.
function filterTasks(taskArray) {
  if (currentFilter === "pending") {
    return taskArray.filter(task => !task.completed);
  }
  if (currentFilter === "completed") {
    return taskArray.filter(task => task.completed);
  }
  return taskArray;
}

// Update the task counters.
function updateSummary() {
  const completed = tasks.filter(task => task.completed).length;
  totalCount.textContent = tasks.length;
  pendingCount.textContent = tasks.length - completed;
  completedCount.textContent = completed;

  footerText.textContent = tasks.length === 0
    ? "Start with one small task."
    : `${completed} of ${tasks.length} task${tasks.length === 1 ? "" : "s"} completed`;
}

// Display tasks based on the current search and filter settings.
function displayTasks() {
  taskList.replaceChildren();

  const visibleTasks = filterTasks(searchTasks(tasks));

  visibleTasks.forEach(task => {
    const item = document.createElement("li");
    item.className = "task-item";
    if (task.completed) item.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark ${task.title} as ${task.completed ? "pending" : "completed"}`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.title}`);
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    item.append(checkbox, title, deleteButton);
    taskList.appendChild(item);
  });

  emptyState.hidden = visibleTasks.length > 0;
  if (visibleTasks.length === 0 && tasks.length > 0) {
    emptyState.querySelector("h3").textContent = "No matching tasks";
    emptyState.querySelector("p").textContent = "Try another search or filter.";
  } else {
    emptyState.querySelector("h3").textContent = "No tasks to show";
    emptyState.querySelector("p").textContent = "Add a task above to get started.";
  }

  updateSummary();
}

// Event: add a task when the form is submitted.
taskForm.addEventListener("submit", event => {
  event.preventDefault();
  addTask(taskInput.value);
});

// Event: update results as the user types in the search box.
searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value;
  displayTasks();
});

// Event: change the status filter.
filterSelect.addEventListener("change", () => {
  currentFilter = filterSelect.value;
  displayTasks();
});

// Remove every completed task.
clearCompletedButton.addEventListener("click", () => {
  const before = tasks.length;
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  displayTasks();
  message.textContent = before === tasks.length
    ? "There are no completed tasks to clear."
    : "Completed tasks cleared.";
});

// Initial display, including tasks restored from Local Storage.
displayTasks();
