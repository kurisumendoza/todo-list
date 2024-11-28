import { renderTasksList } from './taskView';
import { dailyTask } from './dailyTasks';
import { weeklyTask } from './weeklyTasks';
import { monthlyTask } from './monthlyTasks';
import { taskFilterUI } from './selectors';
import { loadFromLocalStorage } from './storageManager';

const filters = {
  daily: dailyTask,
  weekly: weeklyTask,
  monthly: monthlyTask,
};

export const filterTasks = function (key, filter) {
  if (!loadFromLocalStorage(key)) return;
  filter.tasksList = loadFromLocalStorage(key);
  renderTasksList(filter.tasksList);
};

taskFilterUI.addEventListener('click', (e) => {
  const filter = e.target.id;
  if (filters.hasOwnProperty(filter)) {
    filterTasks(filter, filters[filter]);
  }
});
