import { TaskModal } from './taskModal';
import { taskModalUI } from './selectors';
import { filterTasks } from './taskFilter';
import { renderNewTask, renderEditedTask } from './taskView';
import { categoriesObj, showElement, hideElement } from './helpers';
import { saveToLocalStorage } from './storageManager';

export const editTask = new TaskModal();

let taskDetails = {};

export const editTaskModal = function ({ id, tag }) {
  taskDetails = { id, tag };
  const task = categoriesObj[tag].tasksList[categoriesObj[tag].findByID(id)];
  editTask.open();
  TaskModal.editMode = true;
  showElement(taskModalUI.save);
  hideElement(taskModalUI.okay);
  taskModalUI.task.value = task.task;
  taskModalUI.note.value = task.note;
  taskModalUI.date.value = task.date;
  taskModalUI.time.value = task.time;
  taskModalUI.category.value = task.tag;
  editTask.switchRecurrence(tag);
  editTask.manageRecurrence(tag, true, task.recurrence);
};

const changeTag = function (newTag) {
  taskDetails.newTag = newTag;
  editTask.switchRecurrence(newTag);
};

const editedTask = function () {
  if (!taskDetails.newTag) {
    categoriesObj[taskDetails.tag].edit(taskDetails.id, editTask.save());
    renderEditedTask(
      categoriesObj[taskDetails.tag].tasksList,
      categoriesObj[taskDetails.tag].findByID(taskDetails.id)
    );
    saveToLocalStorage(taskDetails.tag, categoriesObj[taskDetails.tag]);
  } else {
    categoriesObj[taskDetails.tag].delete(taskDetails.id);
    categoriesObj[taskDetails.newTag].add(editTask.save(), taskDetails.id);
    renderNewTask(categoriesObj[taskDetails.newTag].tasksList);
    saveToLocalStorage(taskDetails.tag, categoriesObj[taskDetails.tag]);
  }
};

const saveEditedTask = function () {
  editTask.getRecurrence();
  filterTasks(taskModalUI.category.value);
  editedTask();
  saveToLocalStorage(
    taskModalUI.category.value,
    editTask.category(taskModalUI.category.value)
  );
};

taskModalUI.save.addEventListener('click', (e) => {
  e.preventDefault();
  saveEditedTask();
  editTask.close();
});
taskModalUI.category.addEventListener('change', (e) => {
  if (!TaskModal.editMode) return;
  changeTag(e.target.value);
});
