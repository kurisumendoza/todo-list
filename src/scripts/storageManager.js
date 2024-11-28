import { dailyTask } from './dailyTasks';
import { renderTasksList } from './taskView';

export const saveToLocalStorage = function (key, category) {
  localStorage.setItem(key, JSON.stringify(category.tasksList));
};

export const loadFromLocalStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};
