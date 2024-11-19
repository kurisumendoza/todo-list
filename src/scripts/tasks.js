export class Task {
  constructor() {
    this.tasksList = [];
  }

  addTask(id, task, note, date, time) {
    this.tasksList.push({ id, task, note, date, time });
  }

  editTask(id, task, note, date, time) {
    this.tasksList[this.findTaskByID(id)] = {
      ...this.tasksList[this.findTaskByID(id)],
      task,
      note,
      date,
      time,
    };
  }

  pinTask(id) {
    this.tasksList[this.findTaskByID(id)].pin = 'pinned';
  }

  removePin(id) {
    delete this.tasksList[this.findTaskByID(id)].pin;
  }

  completeTask() {}

  deleteTask(id) {
    this.tasksList.splice(this.findTaskByID(id), 1);
  }

  findTaskByID(id) {
    return this.tasksList.findIndex((task) => {
      if (id === task.id) return true;
    });
  }

  rearrangeTask() {}

  log() {
    console.log(this.tasksList);
  }
}
