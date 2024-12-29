import { renderTasksList } from './taskView';
import { categoriesObj } from './helpers';
import { taskFilterUI } from './selectors';
import { loadFromLocalStorage } from './storageManager';
import { togglePinnedView } from './taskView';

let currentPage = 'daily';

const filters = categoriesObj;

export const filterTasksRender = function (key, filter) {
  if (!loadFromLocalStorage(key)) {
    renderTasksList([]);
    return;
  }
  filter.tasksList = loadFromLocalStorage(key);
  renderTasksList(filter.tasksList);
};

const filterHighlight = function (filter) {
  document.getElementById(currentPage).style.backgroundColor = 'transparent';
  document.getElementById(filter).style.backgroundColor = '#00000010';
};

export const filterTasks = function (filter) {
  if (currentPage === filter) return;
  filterHighlight(filter);
  currentPage = filter;
  if (filters.hasOwnProperty(filter)) {
    filterTasksRender(filter, filters[filter]);
  }
  togglePinnedView(categoriesObj[filter].tasksList);
};

taskFilterUI.addEventListener('click', (e) => {
  if (!e.target.id) return;
  filterTasks(e.target.id);
});