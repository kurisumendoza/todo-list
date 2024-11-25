import { TaskModal } from './taskModal';
import { addTaskInput, addTaskBtn, taskModalUI } from './selectors';
import { renderTask } from './taskView';

export const createTask = new TaskModal(taskModalUI);

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
  renderTask(category.tasksList);
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
  saveTask(createTask.category(taskModalUI.category.value));
  displayTask(createTask.category(taskModalUI.category.value));
  createTask.close();
});
