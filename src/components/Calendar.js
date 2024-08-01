import React from "react";
import PropTypes from "prop-types";

const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = ({
  weekCalendarList,
  currentDate,
  goToPreviousMonth,
  goToNextMonth,
  todos = {},
}) => {
  const today = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const formatDate = (day) => {
    const date = new Date(currentYear, currentMonth, day + 1);
    return date.toISOString().split("T")[0];
  };

  const getTodoStatusClass = (day) => {
    const dayString = formatDate(day);
    const status = todos[dayString];
    if (status === undefined) return "filled";
    if (status === 100) return "completed-100";
    if (status === 50) return "completed-50";
    if (status === 10) return "completed-10";
    return "empty";
  };

  return (
    <div className="calendar-container">
      <div className="title">
        <button className="nav-button" onClick={goToPreviousMonth}>
          &lt;
        </button>
        <h1>{currentDate.getMonth() + 1}월</h1>
        <button className="nav-button" onClick={goToNextMonth}>
          &gt;
        </button>
      </div>
      <div className="calendar">
        <table>
          <thead>
            <tr>
              {DAY_LIST.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekCalendarList.map((week, i) => (
              <tr key={i}>
                {week.map((day, j) => {
                  // 날짜가 존재하지 않는 경우
                  if (!day) {
                    return <td key={j} className="empty"></td>;
                  }
                  const isToday =
                    today.getDate() === day &&
                    today.getMonth() === currentMonth &&
                    today.getFullYear() === currentYear;
                  const statusClass = getTodoStatusClass(day);
                  const className =
                    isToday && statusClass === "completed-100"
                      ? "completed-100"
                      : `${statusClass} ${isToday ? "today" : ""}`;

                  return (
                    <td key={j} className={className}>
                      {day}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  weekCalendarList: PropTypes.arrayOf(PropTypes.array).isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  goToPreviousMonth: PropTypes.func.isRequired,
  goToNextMonth: PropTypes.func.isRequired,
  todos: PropTypes.objectOf(PropTypes.number), // { 'YYYY-MM-DD': completionStatus }
};

export default Calendar;
