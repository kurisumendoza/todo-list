import { Task } from './tasks';

class DailyTask extends Task {}

export const dailyTask = new DailyTask();

dailyTask.add({
  id: 1,
  task: 'eat',
  note: 'during midday',
  date: '12-10-2024',
  time: '12:30',
});
dailyTask.add({
  id: 2,
  task: 'eat again',
  note: 'during midnight',
  date: '12-11-2024',
  time: '00:30',
});
dailyTask.add({
  id: 3,
  task: 'eat once more',
  note: 'before sleep',
  date: '12-11-2024',
  time: '03:30',
  recurrence: ['Everyday'],
});
dailyTask.add({
  id: 4,
  task: 'eat in dreams',
  note: 'while sleeping',
  date: '12-11-2024',
  time: '05:00',
  recurrence: ['Monday', 'Tuesday', 'Wednesday'],
});

dailyTask.delete(1);
dailyTask.pin(3);
// dailyTask.removePin(3);
dailyTask.edit(3, 'maybe eat once more', 'before sleep', '12-11-2024', '03:30');
dailyTask.markComplete(2);
// dailyTask.markIncomplete(2);
dailyTask.rearrange(4, 0);

dailyTask.log();
