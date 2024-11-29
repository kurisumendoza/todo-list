import { TaskModal } from './taskModal';
import { addTaskInput, addTaskBtn, taskModalUI } from './selectors';
import { renderNewTask } from './taskView';
import { saveToLocalStorage } from './storageManager';
import { filterTasks } from './taskFilter';

const createTask = new TaskModal();

const addTextToDialog = function () {
  taskModalUI.task.value = addTaskInput.value.trim();
  addTaskInput.value = '';
  addTaskBtn.style.visibility = 'hidden';
};

const isInputEmpty = () => addTaskInput.value.trim().length < 1;

const saveTask = function (category) {
  category.add(createTask.save());
};

const displayTask = function (category) {
  renderNewTask(category.tasksList);
};

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
  createTask.open();
  addTextToDialog();
});
addTaskBtn.addEventListener('click', () => {
  createTask.open();
  addTextToDialog();
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
