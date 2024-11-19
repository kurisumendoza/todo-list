export class Task {
  constructor() {
    this.tasksList = [];
  }

  add(id, task, note, date, time) {
    this.tasksList.push({ id, task, note, date, time });
  }

  edit(id, task, note, date, time) {
    this.tasksList[this.findByID(id)] = {
      ...this.tasksList[this.findByID(id)],
      task,
      note,
      date,
      time,
    };
  }

  pin(id) {
    this.tasksList[this.findByID(id)].pin = 'pinned';
  }

  removePin(id) {
    delete this.tasksList[this.findByID(id)].pin;
  }

  markComplete(id) {
    this.tasksList[this.findByID(id)].complete = 'complete';
  }

  markIncomplete(id) {
    delete this.tasksList[this.findByID(id)].complete;
  }

  delete(id) {
    this.tasksList.splice(this.findByID(id), 1);
  }

  findByID(id) {
    return this.tasksList.findIndex((task) => {
      if (id === task.id) return true;
    });
  }

  rearrange() {}

  log() {
    console.log(this.tasksList);
  }
}
