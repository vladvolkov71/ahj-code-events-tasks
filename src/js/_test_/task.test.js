// Task.test.js
import Task from "../Task";

describe("Task", () => {
  it("should create a task with given name", () => {
    const task = new Task("Test Task");
    expect(task.name).toBe("Test Task");
    expect(task.isPinned).toBe(false);
  });
});
