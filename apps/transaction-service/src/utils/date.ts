export const isLessThanFiveMinutes = (date: Date): boolean => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 1000 / 60);

  return minutes < 5;
};
