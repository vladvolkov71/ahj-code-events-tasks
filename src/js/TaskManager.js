// TaskManager.js

import Task from "./Task";

class TaskManager {
  constructor() {
    this.tasks = [];
    this.allTasksElement = document.getElementById("task-list");
    this.pinnedTasksElement = document.getElementById("pinned-list");
    this.errorMessageElement = document.getElementById("error-message");
    this.taskInputElement = document.getElementById("task-input");

    this.taskInputElement.addEventListener(
      "keypress",
      this.handleKeyPress.bind(this),
    );
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      const taskName = this.taskInputElement.value.trim();
      if (!taskName) {
        this.displayError("Поле не может быть пустым");
        return;
      }

      const newTask = new Task(taskName);
      this.tasks.push(newTask);
      this.taskInputElement.value = "";
      this.updateTaskList();
    }
  }

  displayError(message) {
    this.errorMessageElement.textContent = message;
    setTimeout(() => {
      this.errorMessageElement.textContent = "";
    }, 2000);
  }

  updateTaskList() {
    const filter = this.taskInputElement.value.toLowerCase();
    const filteredTasks = this.tasks.filter(
      (task) => task.name.toLowerCase().startsWith(filter) && !task.isPinned,
    );
    this.allTasksElement.innerHTML = "";
    if (filteredTasks.length === 0) {
      this.allTasksElement.innerHTML = "<p>Нет задач</p>";
    } else {
      filteredTasks.forEach((task) => this.renderTask(task));
    }

    this.updatePinnedList();
  }

  renderTasks(tasks) {
    this.allTasksElement.innerHTML = "";
    tasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.textContent = task.name;
      this.allTasksElement.appendChild(taskElement);
    });
  }

  renderTask(task) {
    const taskElement = document.createElement("div");
    taskElement.className = "task";

    const taskNameElement = document.createElement("span");
    taskNameElement.textContent = task.name;

    const actionsElement = document.createElement("div");
    actionsElement.className = "actions";

    const pinButton = document.createElement("button");
    pinButton.textContent = task.isPinned ? "v" : "○";
    pinButton.className = task.isPinned ? "unpin" : "pin";
    pinButton.addEventListener("click", () => this.togglePin(task.name));

    actionsElement.appendChild(pinButton);
    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(actionsElement);

    if (task.isPinned) {
      this.pinnedTasksElement.appendChild(taskElement);
    } else {
      this.allTasksElement.appendChild(taskElement);
    }
  }

  togglePin(taskName) {
    const task = this.tasks.find((t) => t.name === taskName);
    if (task) {
      task.isPinned = !task.isPinned;
      this.updateTaskList();
    }
  }

  pinTask(taskName) {
    const task = this.tasks.find((t) => t.name === taskName);
    if (task && !task.isPinned) {
      task.isPinned = true;
      this.updateTaskList();
    }
  }

  unpinTask(taskName) {
    const task = this.tasks.find((t) => t.name === taskName);
    if (task && task.isPinned) {
      task.isPinned = false;
      this.updateTaskList();
    }
  }

  updatePinnedList() {
    const pinnedTasks = this.tasks.filter((task) => task.isPinned);
    this.pinnedTasksElement.innerHTML = pinnedTasks.length
      ? ""
      : "<p>Нет закрепленных задач</p>";
    pinnedTasks.forEach((task) => this.renderTask(task));
  }

  filterTasks(filter) {
    return this.tasks.filter((task) =>
      task.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  initialize() {
    this.updateTaskList();
  }

  addTask(taskName) {
    if (!taskName) {
      throw new Error("Название задачи не может быть пустым");
    }
    const newTask = new Task(taskName);
    this.tasks.push(newTask);
    this.updateTaskList();
  }
}

export default TaskManager;
