function randomHour(min, max) {
  return (Math.random() * (max - min) + min) / 3600;
}
export { randomHour };
