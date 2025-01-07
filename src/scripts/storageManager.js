export const saveToLocalStorage = function (key, category) {
  localStorage.setItem(key, JSON.stringify(category.tasksList));
};

export const loadFromLocalStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};
