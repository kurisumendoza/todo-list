export const tasksListContainer = document.querySelector('.tasks-list');
export const taskContainer = document.querySelectorAll;

export const addTaskInput = document.querySelector('.add-task');
export const addTaskBtn = document.querySelector('.okay-btn');

export const taskCategories = {};

export const taskFilterUI = document.querySelector('.task-filter');

export const taskModalUI = {
  modal: document.querySelector('.task-details-modal'),
  form: document.querySelector('.task-form'),
  okay: document.getElementById('okay'),
  cancel: document.querySelector('.cancel-btn'),
  task: document.getElementById('task'),
  note: document.getElementById('note'),
  date: document.getElementById('date'),
  time: document.getElementById('time'),
  category: document.getElementById('category'),
  recurrence: document.getElementsByName('recurrence'),
};
