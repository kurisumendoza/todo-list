import { dailyTask } from './dailyTasks';
import { weeklyTask } from './weeklyTasks';
import { monthlyTask } from './monthlyTasks';
import { taskModalUI } from './selectors';
import { showElement, hideElement } from './helpers';

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

  switchRecurrence(option) {
    if (option === 'daily') {
      showElement(taskModalUI.recurrenceLabel);
      showElement(taskModalUI.dailyRecurrence, 'grid');
      hideElement(taskModalUI.weeklyRecurrence);
    }
    if (option === 'weekly') {
      showElement(taskModalUI.recurrenceLabel);
      hideElement(taskModalUI.dailyRecurrence);
      showElement(taskModalUI.weeklyRecurrence, 'grid');
    }
    if (option === 'monthly') {
      hideElement(taskModalUI.recurrenceLabel);
      hideElement(taskModalUI.dailyRecurrence);
      hideElement(taskModalUI.weeklyRecurrence);
    }
  }
}
