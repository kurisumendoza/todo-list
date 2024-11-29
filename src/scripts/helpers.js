export const showElement = function (el, display) {
  el.style.display = display || 'block';
};

export const hideElement = function (el) {
  el.style.display = 'none';
};
