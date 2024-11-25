export class Task {
  constructor() {
    this.tasksList = [];
  }

  add(taskDetails) {
    const { id, task, note, date, time, recurrence = 'none' } = taskDetails;
    this.tasksList.push({ id, task, note, date, time, recurrence, category });
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

  rearrange(id, newPos) {
    this.tasksList.splice(
      newPos,
      0,
      this.tasksList.splice(this.findByID(id), 1)[0]
    );
  }
}
