import { TaskModal } from './taskModal';
import { addTaskInput, taskModal } from './selectors';

export const addTask = new TaskModal();

addTaskInput.addEventListener('click', addTask.openModal);
taskModal.cancel.addEventListener('click', addTask.closeModal);
