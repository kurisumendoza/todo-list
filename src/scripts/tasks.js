import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId();

export class Task {
  constructor() {
    this.tasksList = [];
  }

  add(taskDetails) {
    const {
      id = uid.randomUUID(),
      task,
      note,
      date,
      time,
      pinned = false,
      completed = false,
      recurrence = 'none',
      category,
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
      category,
    });
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

  togglePin(id) {
    this.tasksList[this.findByID(id)].pinned =
      !this.tasksList[this.findByID(id)].pinned;
  }

  toggleCompletion(id) {
    this.tasksList[this.findByID(id)].completed =
      !this.tasksList[this.findByID(id)].completed;
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
