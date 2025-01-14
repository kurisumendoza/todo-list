export const dateNavUI = {
  day: document.querySelector('.day'),
  date: document.querySelector('.date'),
  previousDayBtn: document.querySelector('.previous-day'),
  nextDayBtn: document.querySelector('.next-day'),
  todayBtn: document.querySelector('.today-btn'),
};

export const mainTasksListContainer = document.querySelector('main');

export const tasksListContainer = document.querySelector('.tasks-list');
export const pinnedContainer = document.querySelector('.pinned-container');
export const pinnedTasks = document.querySelector('.pinned-tasks');

export const addTaskInput = document.querySelector('.add-task');
export const addTaskBtn = document.querySelector('.okay-btn');

export const taskFilterUI = document.querySelector('.task-filter');

export const taskModalUI = {
  modal: document.querySelector('.task-details-modal'),
  form: document.querySelector('.task-form'),
  okay: document.getElementById('okay'),
  save: document.getElementById('save'),
  cancel: document.querySelector('.cancel-btn'),
  task: document.getElementById('task'),
  note: document.getElementById('note'),
  date: document.getElementById('date'),
  time: document.getElementById('time'),
  category: document.getElementById('category'),
  recurrenceLabel: document.querySelector('.recurrence-label'),
  recurrence: document.getElementsByName('recurrence'),
  dailyRecurrence: document.querySelector('.daily-recurrence'),
  weeklyRecurrence: document.querySelector('.weekly-recurrence'),
  dailyCheckboxes: document.querySelectorAll(
    '.daily-recurrence input[type="checkbox"]'
  ),
  weeklyRadios: document.querySelectorAll(
    '.weekly-recurrence input[type="radio"]'
  ),
  error: document.querySelector('.error-daily'),
};
