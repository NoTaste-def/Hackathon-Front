import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const SmallCalendar = ({ weekCalendarList, activityName, userId, url }) => {
  const [completedDates, setCompletedDates] = useState([]);

  useEffect(() => {
    const fetchCompletedDates = async () => {
      try {
        const response = await axios.get(`${url}/calendar/${activityName}/`, {
          withCredentials: true,
          headers: { "X-User-Id": userId },
        });
        setCompletedDates(response.data.dates);
        console.log(`${activityName}`);
      } catch (error) {
        console.error(`Error fetching data for ${activityName}:`, error);
      }
    };

    fetchCompletedDates();
  }, [activityName, userId, url]);

  const isCompleted = (day) => {
    const date = new Date();
    date.setDate(day);
    const formattedDate = date.toISOString().split("T")[0];
    return completedDates.includes(formattedDate);
  };

  return (
    <div className="small-calendar-container">
      <div className="small-calendar">
        <table>
          <tbody>
            {weekCalendarList.map((week, i) => (
              <tr key={i}>
                {week.map((day, j) => (
                  <td
                    key={j}
                    className={
                      day
                        ? isCompleted(day)
                          ? "completed"
                          : "not-completed"
                        : "empty"
                    }
                  >
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
  activityName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default SmallCalendar;
