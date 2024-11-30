import TaskManager from "../TaskManager";

describe("TaskManager", () => {
  let taskManager;

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="task-input" type="text" placeholder="Enter a task">
      <p id="error-message" class="error"></p>
      <div id="pinned-list"><p>No pinned tasks</p></div>
      <div id="task-list"><p>No tasks found</p></div>
    `;
    taskManager = new TaskManager();
  });

  it("should add a new task", () => {
    taskManager.taskInputElement.value = "New Task";
    const event = new KeyboardEvent("keypress", { key: "Enter" });
    taskManager.taskInputElement.dispatchEvent(event);

    expect(taskManager.tasks.length).toBe(1);
    expect(taskManager.tasks[0].name).toBe("New Task");
    expect(document.getElementById("task-list").children.length).toBe(1);
  });

  it("should not add an empty task", () => {
    taskManager.taskInputElement.value = "";
    const event = new KeyboardEvent("keypress", { key: "Enter" });
    taskManager.taskInputElement.dispatchEvent(event);

    expect(taskManager.tasks.length).toBe(0);
    expect(document.getElementById("error-message").textContent).toBe(
      "Поле не может быть пустым",
    );
  });

  it("should display error for a short period", async () => {
    taskManager.displayError("Error message");
    expect(document.getElementById("error-message").textContent).toBe(
      "Error message",
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 2100);
    });
    expect(document.getElementById("error-message").textContent).toBe("");
  });

  it("should render tasks correctly", () => {
    taskManager.taskInputElement.value = "Task 1";
    taskManager.taskInputElement.dispatchEvent(
      new KeyboardEvent("keypress", { key: "Enter" }),
    );
    taskManager.taskInputElement.value = "Task 2";
    taskManager.taskInputElement.dispatchEvent(
      new KeyboardEvent("keypress", { key: "Enter" }),
    );

    taskManager.updateTaskList();

    expect(document.getElementById("task-list").children.length).toBe(2);
    expect(document.getElementById("task-list").textContent).toContain(
      "Task 1",
    );
    expect(document.getElementById("task-list").textContent).toContain(
      "Task 2",
    );
  });

  it("should filter tasks correctly", () => {
    taskManager.taskInputElement.value = "Task 1";
    taskManager.taskInputElement.dispatchEvent(
      new KeyboardEvent("keypress", { key: "Enter" }),
    );
    taskManager.taskInputElement.value = "Another Task";
    taskManager.taskInputElement.dispatchEvent(
      new KeyboardEvent("keypress", { key: "Enter" }),
    );

    taskManager.taskInputElement.value = "Task";
    taskManager.updateTaskList();

    expect(document.getElementById("task-list").children.length).toBe(1);
    expect(document.getElementById("task-list").textContent).toContain(
      "Task 1",
    );
  });

  it("should pin a task", () => {
    taskManager.taskInputElement.value = "Pin Task";
    const event = new KeyboardEvent("keypress", { key: "Enter" });
    taskManager.taskInputElement.dispatchEvent(event);

    taskManager.togglePin("Pin Task");

    expect(taskManager.tasks[0].isPinned).toBe(true);
    expect(document.getElementById("pinned-list").children.length).toBe(1);
    expect(document.getElementById("task-list").children.length).toBe(1);
  });

  it("should unpin a task", () => {
    taskManager.taskInputElement.value = "Unpin Task";
    taskManager.taskInputElement.dispatchEvent(
      new KeyboardEvent("keypress", { key: "Enter" }),
    );

    taskManager.togglePin("Unpin Task");
    taskManager.togglePin("Unpin Task");

    expect(taskManager.tasks[0].isPinned).toBe(false);
    expect(document.getElementById("pinned-list").children.length).toBe(1);
    expect(document.getElementById("task-list").children.length).toBe(1);
  });

  it("should add task via addTask method", () => {
    taskManager.addTask("New Method Task");

    expect(taskManager.tasks.length).toBe(1);
    expect(taskManager.tasks[0].name).toBe("New Method Task");
    expect(document.getElementById("task-list").children.length).toBe(1);
  });

  it("should not add an empty task via addTask method", () => {
    expect(() => taskManager.addTask("")).toThrow(
      "Название задачи не может быть пустым",
    );
  });

  it("should update pinned list", () => {
    taskManager.taskInputElement.value = "Task 1";
    taskManager.taskInputElement.dispatchEvent(
      new KeyboardEvent("keypress", { key: "Enter" }),
    );
    taskManager.togglePin("Task 1");

    taskManager.updatePinnedList();

    expect(document.getElementById("pinned-list").children.length).toBe(1);
    expect(document.getElementById("pinned-list").textContent).toContain(
      "Task 1",
    );
  });

  it("should display 'No tasks found' if there are no tasks", () => {
    taskManager.updateTaskList();
    expect(document.getElementById("task-list").textContent).toBe("Нет задач");
  });

  it("should display 'No pinned tasks' if there are no pinned tasks", () => {
    taskManager.updatePinnedList();
    expect(document.getElementById("pinned-list").textContent).toBe(
      "Нет закрепленных задач",
    );
  });
});
