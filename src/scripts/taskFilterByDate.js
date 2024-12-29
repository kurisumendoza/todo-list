import { dateObj } from './dateNavigator';

export const isSameDay = function (task) {
  if (task.includes(dateObj.day.toLowerCase())) return true;
};

export const hasNotStarted = function (date) {
  if (dateObj.rawDate.isBefore(date, 'day')) return true;
};

console.log(dateObj.rawDate.isBefore('2024-12-30', 'day'));
