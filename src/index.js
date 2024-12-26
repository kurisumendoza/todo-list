import { dailyTask } from './scripts/dailyTasks';
import { weeklyTask } from './scripts/weeklyTasks';
import { monthlyTask } from './scripts/monthlyTasks';
import { addTask } from './scripts/taskCreation';
import { filterTasksRender as initializeTodoList } from './scripts/taskFilter';
import { togglePinnedView as initializePinnedTasks } from './scripts/taskView';
import { toggleCompletion } from './scripts/taskCompletion';
import { manageTask } from './scripts/taskManagement';
import styles from './styles/main.css';

window.addEventListener('DOMContentLoaded', () => {
  initializeTodoList('daily', dailyTask);
  initializePinnedTasks(dailyTask.tasksList);
});
