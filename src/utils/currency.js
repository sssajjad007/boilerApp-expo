export const currency = (value, showUnit = true) => {
  if (!value) {
    return showUnit ? '0 تومان' : '0';
  }

  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (showUnit) {
    value += ' تومان';
  }
  return value;
};
