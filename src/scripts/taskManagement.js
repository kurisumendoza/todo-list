import { tasksListContainer } from './selectors';
import { editTaskModal } from './taskEditing';
import { categoriesObj } from './helpers';
import { saveToLocalStorage } from './storageManager';
import {
  renderTaskManageModal,
  renderConfirmDeleteModal,
  removeDeletedTask,
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

tasksListContainer.addEventListener('click', (e) => {
  openTaskManagement(e);
});
taskManageModal.addEventListener('click', (e) => {
  if (e.target === taskManageModal) taskManageModal.close();
  if (e.target.classList.contains('edit-task')) editTaskModal(taskToManage);
  if (e.target.classList.contains('delete-task'))
    confirmDeleteModal.showModal();
  taskManageModal.close();
});
confirmDeleteModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('del-yes')) deleteTask(taskToManage);
  if (e.target.classList.contains('del-no')) confirmDeleteModal.close();
});
