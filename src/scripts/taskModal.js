import { dailyTask } from './dailyTasks';
import { weeklyTask } from './weeklyTasks';
import { monthlyTask } from './monthlyTasks';
import { taskModalUI } from './selectors';

export class TaskModal {
  constructor() {
    this.categories = {
      daily: dailyTask,
      weekly: weeklyTask,
      monthly: monthlyTask,
    };
    this.recurrence = [];
  }

  open() {
    taskModalUI.modal.showModal();
  }

  close() {
    taskModalUI.modal.close();
    taskModalUI.form.reset();
  }

  save() {
    return {
      task: taskModalUI.task.value,
      note: taskModalUI.note.value,
      date: taskModalUI.date.value,
      time: taskModalUI.time.value,
      recurrence: this.recurrence,
    };
  }

  clear() {
    addTaskInput.value = '';
    addTaskBtn.style.visibility = 'hidden';
  }

  category(option) {
    if (this.categories.hasOwnProperty(option)) return this.categories[option];
  }

  getRecurrence() {
    taskModalUI.recurrence.forEach((day) => {
      if (day.checked) this.recurrence.push(day.value);
    });
  }
}
