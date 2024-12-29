import { TaskModal } from './taskModal';
import { addTaskInput, addTaskBtn, taskModalUI } from './selectors';
import { renderNewTask } from './taskView';
import { saveToLocalStorage } from './storageManager';
import { filterTasks } from './taskFilterByTag';
import { showElement, hideElement } from './helpers';

const createTask = new TaskModal();

const addTextToDialog = function () {
  taskModalUI.task.value = addTaskInput.value.trim();
  addTaskInput.value = '';
  addTaskBtn.style.visibility = 'hidden';
};

const startTaskCreation = function () {
  createTask.open();
  addTextToDialog();
  showElement(taskModalUI.okay);
  hideElement(taskModalUI.save);
};

const isInputEmpty = () => addTaskInput.value.trim().length < 1;

const saveTask = function (category) {
  category.add(createTask.save());
};

const displayTask = function (category) {
  renderNewTask(category.tasksList);
};

taskModalUI.form.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') e.preventDefault();
});

addTaskInput.addEventListener('input', () => {
  if (isInputEmpty()) return;
  addTaskBtn.style.visibility = 'visible';
});
addTaskInput.addEventListener('keyup', (e) => {
  if (e.key !== 'Backspace') return;
  if (isInputEmpty()) addTaskBtn.style.visibility = 'hidden';
});
addTaskInput.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  if (addTaskInput.value.trim().length <= 0) return;
  e.preventDefault();
  startTaskCreation();
});
addTaskBtn.addEventListener('click', () => {
  startTaskCreation();
});
taskModalUI.category.addEventListener('change', (e) => {
  if (TaskModal.editMode) return;
  createTask.switchRecurrence(e.target.value);
});
taskModalUI.cancel.addEventListener('click', (e) => {
  e.preventDefault();
  createTask.close();
});
taskModalUI.okay.addEventListener('click', (e) => {
  e.preventDefault();
  filterTasks(taskModalUI.category.value);
  createTask.getRecurrence();
  saveTask(createTask.category(taskModalUI.category.value));
  displayTask(createTask.category(taskModalUI.category.value));
  saveToLocalStorage(
    taskModalUI.category.value,
    createTask.category(taskModalUI.category.value)
  );
  createTask.close();
});
