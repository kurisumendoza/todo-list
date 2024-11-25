import { tasksListContainer } from './selectors';

let html = '';

const assignHTML = function (tasksList) {
  tasksList.forEach((_, i) => {
    html += `
    <div class="task-container">
      <input type="checkbox" />
        <div class="task-details">
          <p class="task-name">${tasksList[i].task}</p>
          <p class="task-note">${tasksList[i].note}</p>
        </div>
        <div class="task-date-and-time">
          <p class="task-date">${tasksList[i].date}</p>
          <p class="task-time">${tasksList[i].time}</p>
      </div>
      <button class="manage-task">⋯</button>
    </div>
  `;
  });
};

export const renderTask = function (tasksList) {
  assignHTML(tasksList);
  tasksListContainer.insertAdjacentHTML('afterbegin', html);
};
