const calculateTodoStats = (todos) => {
  const allDates = Object.keys(todos);
  const totalTodosCount = allDates.length;
  const completed100Count = allDates.filter(
    (date) => todos[date] === 100
  ).length;
  const tenPercentOrMoreDates = allDates.filter((date) => todos[date] >= 10);
  let maxStreak = 0;
  let currentStreak = 0;
  let previousDate = null;

  tenPercentOrMoreDates.sort();

  for (const date of tenPercentOrMoreDates) {
    if (previousDate) {
      const previousDateObj = new Date(previousDate);
      const currentDateObj = new Date(date);

      const diffDays =
        (currentDateObj - previousDateObj) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        currentStreak++;
      } else if (diffDays > 1) {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }
    previousDate = date;
  }
  maxStreak = Math.max(maxStreak, currentStreak);

  return {
    totalTodosCount,
    completed100Count,
    maxStreak,
  };
};

export default calculateTodoStats;
