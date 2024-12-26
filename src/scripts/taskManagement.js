import { tasksListContainer, pinnedTasks } from './selectors';
import { editTaskModal } from './taskEditing';
import { categoriesObj } from './helpers';
import { saveToLocalStorage } from './storageManager';
import {
  renderTaskManageModal,
  renderConfirmDeleteModal,
  removeDeletedTask,
  pinToTop,
  togglePinnedView,
} from './taskView';

renderTaskManageModal();
renderConfirmDeleteModal();

const taskToManage = {};

const taskManageModal = document.querySelector('.manage-modal');
const confirmDeleteModal = document.querySelector('.confirm-delete');

export const openTaskManagement = function (e) {
  if (!e.target.classList.contains('manage-task')) return;
  const rect = e.target.getBoundingClientRect();
  taskManageModal.style.left = `${rect.right + window.scrollX}px`;
  taskManageModal.style.top = `${rect.top + window.scrollY}px`;
  taskManageModal.showModal();
  taskToManage.id = e.target.closest('.task-container').dataset.id;
  taskToManage.tag = e.target.closest('.task-container').dataset.tag;
  console.log(taskToManage);
};

const deleteTask = function ({ id, tag }) {
  removeDeletedTask(
    categoriesObj[tag].tasksList,
    categoriesObj[tag].findByID(id)
  );
  categoriesObj[tag].delete(categoriesObj[id]);
  saveToLocalStorage(tag, categoriesObj[tag]);
  confirmDeleteModal.close();
};

const pinTask = function ({ id, tag }) {
  categoriesObj[tag].rearrange(id, categoriesObj[tag].tasksList.length - 1);
  categoriesObj[tag].togglePin(id);
  pinToTop(categoriesObj[tag].tasksList, categoriesObj[tag].findByID(id));
  saveToLocalStorage(tag, categoriesObj[tag]);
  togglePinnedView(categoriesObj[tag].tasksList);
};

pinnedTasks.addEventListener('click', (e) => openTaskManagement(e));
tasksListContainer.addEventListener('click', (e) => {
  openTaskManagement(e);
});
taskManageModal.addEventListener('click', (e) => {
  if (e.target === taskManageModal) taskManageModal.close();
  if (e.target.classList.contains('edit-task')) editTaskModal(taskToManage);
  if (e.target.classList.contains('delete-task'))
    confirmDeleteModal.showModal();
  if (e.target.classList.contains('pin-task')) pinTask(taskToManage);
  taskManageModal.close();
});
confirmDeleteModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('del-yes')) deleteTask(taskToManage);
  if (e.target.classList.contains('del-no')) confirmDeleteModal.close();
});
window.addEventListener('resize', () => taskManageModal.close());
