import { dateObj } from './dateNavigator';

export const isSameDay = function (task) {
  if (task.includes(dateObj.day.toLowerCase())) return true;
};

export const isSameDate = function (task) {
  if (task.completed.includes(dateObj.date)) return true;
};

export const hasNotStarted = function (date) {
  if (dateObj.rawDate.isBefore(date, 'day')) return true;
};
