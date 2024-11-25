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
      time: taskModalUI.date.value,
      recurrence: taskModalUI.date.value,
    };
  }

  clear() {
    addTaskInput.value = '';
    addTaskBtn.style.visibility = 'hidden';
  }

  category(option) {
    if (this.categories.hasOwnProperty(option)) return this.categories[option];
  }
}
