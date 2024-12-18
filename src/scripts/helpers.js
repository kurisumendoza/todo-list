import { dailyTask } from './dailyTasks';
import { weeklyTask } from './weeklyTasks';
import { monthlyTask } from './monthlyTasks';

export const categoriesObj = {
  daily: dailyTask,
  weekly: weeklyTask,
  monthly: monthlyTask,
};

export const showElement = function (el, display) {
  el.style.display = display || 'block';
};

export const hideElement = function (el) {
  el.style.display = 'none';
};
