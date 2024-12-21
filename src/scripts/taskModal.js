import { taskModalUI } from './selectors';
import { categoriesObj, showElement, hideElement } from './helpers';

export class TaskModal {
  constructor() {
    this.categories = categoriesObj;
    this.recurrence = [];
  }

  open() {
    taskModalUI.modal.showModal();
    this.switchRecurrence('daily');
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
      tag: taskModalUI.category.value,
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

  manageRecurrence(option, state, days = []) {
    const recurrenceMap = {
      daily: taskModalUI.dailyCheckboxes,
      weekly: taskModalUI.weeklyRadios,
    };
    const specifiedDay = Array.isArray(days) ? days : [days];

    if (!specifiedDay.length)
      recurrenceMap[option].forEach((day) => (day.checked = state));
    else
      recurrenceMap[option].forEach((day) => {
        if (specifiedDay.includes(day.value)) day.checked = state;
        else day.checked = !state;
      });
  }

  switchRecurrence(option) {
    this.recurrence = [];
    this.manageRecurrence('daily', false);
    this.manageRecurrence('weekly', false);

    if (option === 'daily') {
      showElement(taskModalUI.recurrenceLabel);
      showElement(taskModalUI.dailyRecurrence, 'grid');
      hideElement(taskModalUI.weeklyRecurrence);
      this.manageRecurrence('daily', true);
    }
    if (option === 'weekly') {
      showElement(taskModalUI.recurrenceLabel);
      hideElement(taskModalUI.dailyRecurrence);
      showElement(taskModalUI.weeklyRecurrence, 'grid');
      this.manageRecurrence('weekly', true, ['monday']);
    }
    if (option === 'monthly') {
      hideElement(taskModalUI.recurrenceLabel);
      hideElement(taskModalUI.dailyRecurrence);
      hideElement(taskModalUI.weeklyRecurrence);
    }
  }
}
