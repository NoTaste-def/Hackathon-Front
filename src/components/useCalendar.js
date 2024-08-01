import { getDaysInMonth, subMonths, addMonths } from "date-fns";
import React from "react";

const CALENDAR_LENGTH = 35;
const DEFAULT_TRASH_VALUE = 0;
const DAY_OF_WEEK = 7;
export const DAY_LIST = ["월", "화", "수", "목", "금", "토", "일"];

const useCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const totalMonthDays = getDaysInMonth(currentDate);

  const getAdjustedDay = (day) => (day === 0 ? 6 : day);
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const adjustedFirstDay = getAdjustedDay(firstDayOfMonth.getDay());

  const prevDayList = Array.from({ length: adjustedFirstDay }).map(
    () => DEFAULT_TRASH_VALUE
  );
  const currentDayList = Array.from({ length: totalMonthDays }).map(
    (_, i) => i + 1
  );
  const nextDayList = Array.from({
    length: CALENDAR_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);
  const weekCalendarList = currentCalendarList.reduce((acc, cur, idx) => {
    const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(cur);
    return acc;
  }, []);

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  return {
    weekCalendarList,
    currentDate,
    setCurrentDate,
    goToPreviousMonth,
    goToNextMonth,
  };
};

export default useCalendar;
