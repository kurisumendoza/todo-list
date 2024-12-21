import { TaskModal } from './taskModal';
import { taskModalUI } from './selectors';
import { categoriesObj } from './helpers';

export const editTask = new TaskModal();

export const editTaskModal = function ({ id, tag }) {
  const task = categoriesObj[tag].tasksList[categoriesObj[tag].findByID(id)];
  editTask.open();
  taskModalUI.task.value = task.task;
  taskModalUI.note.value = task.note;
  taskModalUI.date.value = task.date;
  taskModalUI.time.value = task.time;
  taskModalUI.category.value = task.tag;
  editTask.switchRecurrence(tag);
  editTask.manageRecurrence(tag, true, task.recurrence);
};

const saveEditedTask = function () {};
