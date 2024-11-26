import { tasksListContainer } from './selectors';

let tasksHTML = [];

const generateTaskHTML = function (entry) {
  return `
    <div class="task-container">
      <input type="checkbox" />
        <div class="task-details">
          <p class="task-name">${entry.task}</p>
          <p class="task-note">${entry.note}</p>
        </div>
        <div class="task-date-and-time">
          <p class="task-date">${entry.date}</p>
          <p class="task-time">${entry.time}</p>
      </div>
      <button class="manage-task">⋯</button>
    </div>
  `;
};

const generateTasksListHTML = function (tasksList) {
  tasksList.forEach((task) => {
    tasksHTML.push(generateTaskHTML(task));
  });
};

export const renderTasksList = function (tasksList) {
  generateTasksListHTML(tasksList);
  tasksListContainer.insertAdjacentHTML('afterbegin', tasksHTML.join(''));
};

export const renderNewTask = function (tasksList) {
  tasksHTML.push(generateTaskHTML(tasksList[tasksList.length - 1]));
  tasksListContainer.insertAdjacentHTML(
    'beforeend',
    tasksHTML[tasksHTML.length - 1]
  );
};
