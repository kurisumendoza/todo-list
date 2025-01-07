import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId();

export class Task {
  constructor() {
    this.tasksList = [];
  }

  add(taskDetails, sameID) {
    const {
      id = sameID || uid.randomUUID(),
      task,
      note,
      date,
      time,
      pinned = false,
      completed = [],
      recurrence,
      tag,
    } = taskDetails;
    this.tasksList.push({
      id,
      task,
      note,
      date,
      time,
      pinned,
      completed,
      recurrence,
      tag,
    });
  }

  edit(id, taskDetails) {
    const { task, note, date, time, recurrence, tag } = taskDetails;
    this.tasksList[this.findByID(id)] = {
      ...this.tasksList[this.findByID(id)],
      id,
      task,
      note,
      date,
      time,
      recurrence,
      tag,
    };
  }

  togglePin(id) {
    this.tasksList[this.findByID(id)].pinned =
      !this.tasksList[this.findByID(id)].pinned;
  }

  toggleCompletion(id, date) {
    const completedDates = this.tasksList[this.findByID(id)].completed;
    if (completedDates.includes(date))
      completedDates.splice(completedDates.indexOf(date), 1);
    else completedDates.push(date);
    console.log(completedDates);
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
