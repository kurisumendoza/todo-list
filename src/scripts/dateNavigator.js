import moment from 'moment';
import { dateNavUI } from './selectors';
import { categoriesObj } from './helpers';
import { currentPage } from './taskFilterByTag';
import { renderTasksList, togglePinnedView } from './taskView';

export const dateObj = {
  rawDate: moment(),
  day: moment().format('dddd'),
  date: moment().format('LL'),
};
let dayNavClicks = 0;

export const initializeDate = function () {
  updateDateDisplay();
};

const updateDateDisplay = function () {
  dateNavUI.day.innerText = dateObj.day;
  dateNavUI.date.innerText = dateObj.date;
};

const changeDate = function (direction, btn) {
  if (Math.abs(dayNavClicks + direction) >= 7) {
    btn.style.opacity = '0.25';
    return;
  }
  dayNavClicks += direction;
  dateObj.day = moment().add(dayNavClicks, 'days').format('dddd');
  dateObj.date = moment().add(dayNavClicks, 'days').format('LL');
  dateObj.rawDate = moment().add(dayNavClicks, 'days');
  dateNavUI.previousDayBtn.style.opacity = '';
  dateNavUI.nextDayBtn.style.opacity = '';
  togglePinnedView(categoriesObj[currentPage.tag].tasksList);
  renderTasksList(categoriesObj[currentPage.tag].tasksList);
  updateDateDisplay();
};

initializeDate();

dateNavUI.nextDayBtn.addEventListener('click', (e) => changeDate(1, e.target));
dateNavUI.previousDayBtn.addEventListener('click', (e) =>
  changeDate(-1, e.target)
);
