import { TaskModal } from './taskModal';
import { addTaskInput, addTaskBtn, taskModal } from './selectors';

export const addTask = new TaskModal();

const addTextToDialog = function () {
  taskModal.task.value = addTaskInput.value;
  addTaskInput.value = '';
};

addTaskInput.addEventListener('input', () => {
  if (addTaskInput.value.length < 1) return;
  addTaskBtn.style.visibility = 'visible';
});
addTaskInput.addEventListener('keyup', (e) => {
  if (e.key !== 'Backspace') return;
  if (addTaskInput.value.length < 1) addTaskBtn.style.visibility = 'hidden';
});
addTaskInput.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  if (addTaskInput.value.length <= 0) return;
  e.preventDefault();
  addTask.openModal();
  addTextToDialog();
});
addTaskBtn.addEventListener('click', () => {
  addTask.openModal();
  addTextToDialog();
});
taskModal.cancel.addEventListener('click', (e) => {
  e.preventDefault();
  addTask.closeModal();
});
