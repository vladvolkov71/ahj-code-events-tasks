import "./css/style.css";
import TaskManager from "./js/TaskManager";

const taskManager = new TaskManager();
const taskInput = document.getElementById("task-input");

taskInput.addEventListener("input", function handleInput() {
  const filteredTasks = taskManager.filterTasks(taskInput.value);
  taskManager.renderTasks(filteredTasks);
});

window.pinTask = function handlePinTask(taskName) {
  taskManager.pinTask(taskName);
};

window.unpinTask = function handleUnpinTask(taskName) {
  taskManager.unpinTask(taskName);
};

document.addEventListener("DOMContentLoaded", () => {
  taskManager.initialize();
});
