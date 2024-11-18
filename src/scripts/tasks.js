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

  deleteTask() {}

  rearrangeTask() {}

  log() {
    console.log(this.tasksList);
  }
}
