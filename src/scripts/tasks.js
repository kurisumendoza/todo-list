export class Task {
  constructor() {
    this.tasksList = [];
  }

  addTask(id, task, note, date, time) {
    this.tasksList.push({ id, task, note, date, time });
  }

  editTask() {}

  pinTask() {}

  completeTask() {}

  deleteTask(id) {
    const taskToDelete = this.tasksList.findIndex((task) => {
      if (id === task.id) return true;
    });
    this.tasksList.splice(taskToDelete, 1);
  }

  rearrangeTask() {}

  log() {
    console.log(this.tasksList);
  }
}
