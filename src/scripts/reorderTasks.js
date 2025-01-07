import Sortable from 'sortablejs';
import { categoriesObj } from './helpers';
import { saveToLocalStorage } from './storageManager';

export const moveTask = function ({ container }) {
  const tasks = container.parentNode;
  container.classList.add('drag-handle');
  addStyleOnMove(container);
  const sortable = Sortable.create(tasks, {
    animation: 150,
    easing: 'cubic-bezier(1, 0, 0, 1)',
    handle: '.drag-handle',
    onEnd: (e) => {
      const task = e.item;
      removeStyle(tasks);
      task.classList.remove('drag-handle');
      updateTasksListIndex(
        task.dataset.id,
        categoriesObj[task.dataset.tag],
        e.newIndex
      );
      saveToLocalStorage(task.dataset.tag, categoriesObj[task.dataset.tag]);
      e.preventDefault();
    },
  });
};

const addStyleOnMove = function (container) {
  Array.from(container.parentNode.children).forEach((task) => {
    task.style.transition = '0.4s ease';
    task.style.cursor = 'pointer';
    task.style.borderRadius = '5px';
    task.style.paddingLeft = '5px';
    task.style.paddingRight = '5px';
    task.style.backgroundColor = 'var(--header)';

    if (task !== container) task.style.opacity = '0.5';
  });
};

const removeStyle = function (container) {
  Array.from(container.children).forEach((task) => {
    task.style.transition = '0.4s ease';
    task.style.cursor = '';
    task.style.borderRadius = '';
    task.style.paddingLeft = '';
    task.style.paddingRight = '';
    task.style.backgroundColor = '';
    task.style.opacity = '';
  });
};

const updateTasksListIndex = function (id, tasksGroup, newIndex) {
  const pinned = tasksGroup.tasksList.filter(
    (task) => task.pinned === true
  ).length;

  if (tasksGroup.tasksList[tasksGroup.findByID(id)].pinned)
    tasksGroup.rearrange(id, newIndex);
  else tasksGroup.rearrange(id, newIndex + pinned);
};
