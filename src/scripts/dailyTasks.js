import { Task } from './tasks';

class DailyTask extends Task {
  setRecurring(id, days) {
    this.tasksList[this.findByID(id)].recurrence = days;
  }
}

export const dailyTask = new DailyTask();

dailyTask.add(1, 'eat', 'during midday', '12-10-2024', '12:30');
dailyTask.add(2, 'eat again', 'during midnight', '12-11-2024', '00:30');
dailyTask.add(3, 'eat once more', 'before sleep', '12-11-2024', '03:30');
dailyTask.add(4, 'eat in dreams', 'while sleeping', '12-11-2024', '05:00');

dailyTask.delete(1);
dailyTask.pin(3);
// dailyTask.removePin(3);
dailyTask.edit(3, 'maybe eat once more', 'before sleep', '12-11-2024', '03:30');
dailyTask.markComplete(2);
// dailyTask.markIncomplete(2);
dailyTask.rearrange(4, 0);
dailyTask.setRecurring(4, ['monday', 'tuesday', 'wednesday']);

dailyTask.log();
