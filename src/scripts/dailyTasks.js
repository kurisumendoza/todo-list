import { Task } from './tasks';

export const dailyTask = new Task();

dailyTask.addTask(1, 'eat', 'during midday', '12-10-2024', '12:30');
dailyTask.addTask(2, 'eat again', 'during midnight', '12-11-2024', '00:30');
dailyTask.addTask(3, 'eat once more', 'before sleep', '12-11-2024', '03:30');

dailyTask.deleteTask(1);
dailyTask.pinTask(3);

dailyTask.log();
