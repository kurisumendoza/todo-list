import { tasksListContainer } from './selectors';
import { categoriesObj } from './helpers';
import { saveToLocalStorage } from './storageManager';

const categories = categoriesObj;

const identifyCategory = function (tag) {
  if (categories.hasOwnProperty(tag)) {
    return categories[tag];
  }
};

const toggleCompletionStyling = function (task) {
  task.querySelector('.task-name').classList.toggle('completed');
};

export const toggleCompletion = function (e) {
  if (e.target.type !== 'checkbox') return;
  const task = e.target.closest('.task-container');
  const category = identifyCategory(task.dataset.tag);
  category.toggleCompletion(task.dataset.id);
  toggleCompletionStyling(task);
  saveToLocalStorage(task.dataset.tag, category);
};

tasksListContainer.addEventListener('click', (e) => {
  toggleCompletion(e);
});
