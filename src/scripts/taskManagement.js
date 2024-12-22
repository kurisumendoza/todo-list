import { tasksListContainer } from './selectors';
import { renderTaskManageModal } from './taskView';
import { editTaskModal } from './taskEditing';

renderTaskManageModal();

const taskToManage = {};

const taskManageModal = document.querySelector('.manage-modal');

export const openTaskManagement = function (e) {
  if (!e.target.classList.contains('manage-task')) return;
  const rect = e.target.getBoundingClientRect();
  taskManageModal.style.left = `${rect.right + window.scrollX}px`;
  taskManageModal.style.top = `${rect.top + window.scrollY}px`;
  taskManageModal.showModal();
  taskToManage.id = e.target.closest('.task-container').dataset.id;
  taskToManage.tag = e.target.closest('.task-container').dataset.tag;
};

tasksListContainer.addEventListener('click', (e) => {
  openTaskManagement(e);
});
taskManageModal.addEventListener('click', (e) => {
  if (e.target === taskManageModal) taskManageModal.close();
  if (e.target.classList.contains('edit-task')) {
    editTaskModal(taskToManage);
    taskManageModal.close();
  }
});
