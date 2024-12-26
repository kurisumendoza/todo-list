import { tasksListContainer, pinnedContainer, pinnedTasks } from './selectors';
import { showElement, hideElement } from './helpers';

let tasksHTML = [];
let pinnedTasksHTML = [];

const generateTaskHTML = function (entry) {
  return `
    <div class="task-container" data-id="${entry.id}" data-tag="${entry.tag}">
      <input type="checkbox" ${entry.completed ? 'checked' : ''} />
        <div class="task-details">
          <p class="task-name ${entry.completed ? 'completed' : ''}">
            ${entry.task}
          </p>
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
    if (!task.pinned) tasksHTML.push(generateTaskHTML(task));
    else pinnedTasksHTML.push(generateTaskHTML(task));
  });
};

const clearTasksListHTML = function () {
  tasksHTML = [];
  pinnedTasksHTML = [];
  pinnedTasks.innerHTML = '';
  tasksListContainer.innerHTML = '';
};

export const renderTasksList = function (tasksList) {
  clearTasksListHTML();
  if (tasksList.length === 0) return;
  generateTasksListHTML(tasksList);
  pinnedTasks.insertAdjacentHTML('afterbegin', pinnedTasksHTML.join(''));
  tasksListContainer.insertAdjacentHTML('afterbegin', tasksHTML.join(''));
};

export const renderNewTask = function (tasksList) {
  tasksHTML.push(generateTaskHTML(tasksList[tasksList.length - 1]));
  tasksListContainer.insertAdjacentHTML(
    'beforeend',
    tasksHTML[tasksHTML.length - 1]
  );
};

const editedTaskTemplate = function (html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
};

export const renderEditedTask = function (tasksList, pos) {
  const editedTask = generateTaskHTML(tasksList[pos]);
  tasksHTML.splice(pos, 1, editedTask);
  document
    .querySelector(`[data-id="${tasksList[pos].id}"]`)
    .replaceWith(editedTaskTemplate(tasksHTML[pos]));
};

// Task Management

const generateTaskManageHTML = function () {
  return `
    <dialog class="manage-modal">
      <ul class="manage-list">
        <li class="manage-task pin-task">Pin</li>
        <li class="manage-task edit-task">Edit</li>
        <li class="manage-task move-task">Move</li>
        <li class="manage-task delete-task">Delete</li>
      </ul>
      <div class="manage-arrow"></div>
    </dialog>
  `;
};

export const renderTaskManageModal = function () {
  tasksListContainer.insertAdjacentHTML(
    'beforebegin',
    generateTaskManageHTML()
  );
};

const generateConfirmDeleteHTML = function () {
  return `
    <dialog class="confirm-delete">
      <p>Delete Task?</p>
      <button class="del-yes">Yes</button>
      <button class="del-no">No</button>
    </dialog>
  `;
};

export const renderConfirmDeleteModal = function () {
  tasksListContainer.insertAdjacentHTML(
    'beforebegin',
    generateConfirmDeleteHTML()
  );
};

export const removeDeletedTask = function (tasksList, pos) {
  if (!tasksList[pos].pinned) tasksHTML.splice(pos, 1);
  else pinnedTasksHTML.splice(pos, 1);
  document.querySelector(`[data-id="${tasksList[pos].id}"]`).remove();
};

export const togglePinnedView = function (tasksList) {
  const check = tasksList.some((task) => task.pinned);
  if (check) showElement(pinnedContainer);
  else hideElement(pinnedContainer);
};

export const pinToTop = function (tasksList, pos) {
  removeDeletedTask(tasksList, pos);
  if (tasksList[pos].pinned) {
    pinnedTasksHTML.push(generateTaskHTML(tasksList[pos]));
    pinnedTasks.insertAdjacentHTML(
      'beforeend',
      pinnedTasksHTML[pinnedTasksHTML.length - 1]
    );
  } else {
    tasksHTML.push(generateTaskHTML(tasksList[pos]));
    tasksListContainer.insertAdjacentHTML(
      'beforeend',
      tasksHTML[tasksHTML.length - 1]
    );
  }
};
