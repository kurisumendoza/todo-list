import moment from 'moment';
import { dateNavUI } from './selectors';
import { categoriesObj } from './helpers';
import { currentPage } from './taskFilterByTag';
import { renderTasksList, togglePinnedView } from './taskView';

export const dateObj = {
  rawDate: moment(),
  day: moment().format('dddd'),
  month: moment().format('MMMM'),
  date: moment().format('LL'),
};
let dayNavClicks = 0;

export const initializeDate = function () {
  updateDateDisplay();
  toggleDateNavBtns(dateNavUI.todayBtn, 0, 'none');
};

const updateDateDisplay = function () {
  dateNavUI.day.innerText = dateObj.day;
  dateNavUI.date.innerText = dateObj.date;
};

const changeDate = function (direction, btn) {
  if (Math.abs(dayNavClicks + direction) >= 7) {
    toggleDateNavBtns(btn, 0.25, 'none');
    return;
  }
  dayNavClicks += direction;
  dateObj.day = moment().add(dayNavClicks, 'days').format('dddd');
  dateObj.month = moment().add(dayNavClicks, 'days').format('MMMM');
  dateObj.date = moment().add(dayNavClicks, 'days').format('LL');
  dateObj.rawDate = moment().add(dayNavClicks, 'days');
  toggleDateNavBtns(dateNavUI.previousDayBtn, '', '');
  toggleDateNavBtns(dateNavUI.nextDayBtn, '', '');
  togglePinnedView(categoriesObj[currentPage.tag].tasksList);
  renderTasksList(categoriesObj[currentPage.tag].tasksList);
  updateDateDisplay();
};

export const goToDate = function (date) {
  if (!date || moment(date).format('LL') === dateObj.date) return;

  dateObj.rawDate = moment(date);
  dateObj.day = moment(date).format('dddd');
  dateObj.month = moment(date).format('MMMM');
  dateObj.date = moment(date).format('LL');

  renderTasksList(categoriesObj[currentPage.tag].tasksList);
  updateDateDisplay();

  if (moment(date).format('LL') === moment().format('LL')) {
    dayNavClicks = 0;
    return;
  }
  toggleDateNavBtns(dateNavUI.nextDayBtn, 0.25, 'none');
  toggleDateNavBtns(dateNavUI.previousDayBtn, 0.25, 'none');
  toggleDateNavBtns(dateNavUI.todayBtn, 1, '');
};

const toggleDateNavBtns = function (btn, opacity, pointerEvents) {
  btn.style.opacity = opacity;
  btn.style.pointerEvents = pointerEvents;
};

const backToTodayBtn = function () {
  dayNavClicks = 0;

  dateObj.rawDate = moment();
  dateObj.day = moment().format('dddd');
  dateObj.month = moment().format('MMMM');
  dateObj.date = moment().format('LL');

  toggleDateNavBtns(dateNavUI.previousDayBtn, '', '');
  toggleDateNavBtns(dateNavUI.nextDayBtn, '', '');
  toggleDateNavBtns(dateNavUI.todayBtn, 0, 'none');

  renderTasksList(categoriesObj[currentPage.tag].tasksList);
  updateDateDisplay();
};

initializeDate();

dateNavUI.nextDayBtn.addEventListener('click', (e) => changeDate(1, e.target));
dateNavUI.previousDayBtn.addEventListener('click', (e) =>
  changeDate(-1, e.target)
);
dateNavUI.todayBtn.addEventListener('click', backToTodayBtn);
