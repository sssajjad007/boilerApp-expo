const colors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"];
export const getRandomColor = () => {
  const i = Math.floor((Math.random() * colors.length) % colors.length);
  return colors[i];
};
