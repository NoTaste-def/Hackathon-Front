import React from "react";
import PropTypes from "prop-types";

const SmallCalendar = ({ weekCalendarList }) => {
  return (
    <div className="small-calendar-container">
      <div className="small-calendar">
        <table>
          <tbody>
            {weekCalendarList.map((week, i) => (
              <tr key={i}>
                {week.map((day, j) => (
                  <td key={j} className={day ? "filled" : "empty"}>
                    {day || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

SmallCalendar.propTypes = {
  weekCalendarList: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default SmallCalendar;
