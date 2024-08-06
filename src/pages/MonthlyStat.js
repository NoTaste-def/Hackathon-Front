import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

import 느림이 from "../image/느림이1.png";
import icon_1 from "../image/Routin_icon.png";
import icon_2 from "../image/Top_icon.png";

import 산책 from "../image/btn/유산소 운동하기.png";
import 명상 from "../image/btn/명상하기.png";
import 취침 from "../image/btn/7시간 이상 잠자기.png";
import 견과류 from "../image/btn/견과류 먹기.png";
import 과일 from "../image/btn/야채주스 마시기.png";
import 근력 from "../image/btn/근력 운동하기.png";
import 목욕 from "../image/btn/목욕하기.png";
import 물 from "../image/btn/물 8컵 마시기.png";
import 스트레칭 from "../image/btn/스트레칭 하기.png";
import 단백질 from "../image/btn/단백질 먹기.png";
import 발효식품 from "../image/btn/발효식품 먹기.png";
import 식사 from "../image/btn/아침 식사하기.png";
import 샐러드 from "../image/btn/샐러드 먹기.png";
import 마사지 from "../image/btn/생선 먹기.png";

import useCalendar from "../components/useCalendar";
import Calendar from "../components/Calendar"; // Calendar 컴포넌트를 임포트
import SmallCalendar from "../components/SmallCalendar";
import calculateTodoStats from "../components/todostat";
import Cookies from "js-cookie";

import "./MonthlyStat.css";
import "./Monthly/top.css";
import "./Monthly/calendar_img.css";
import axios from "axios";

const URL =
  "https://port-0-likelion-hackathon-lxmynpl6f586b2fd.sel5.cloudtype.app/";

const MonthlyStat = ({ csrfToken }) => {
  const [topActivities, setTopActivities] = useState([
    {
      className: "fruit",
      imgSrc: `${과일}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "야채주스 마시기",
      days: 0,
    },
    {
      className: "muscle",
      imgSrc: `${근력}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "근력 운동하기",
      days: 0,
    },
    {
      className: "walk",
      imgSrc: `${산책}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "유산소 운동하기",
      days: 0,
    },
    {
      className: "sleep",
      imgSrc: `${취침}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "7시간 이상 잠자기",
      days: 0,
    },
    {
      className: "bath",
      imgSrc: `${목욕}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "목욕하기",
      days: 0,
    },
    {
      className: "salad",
      imgSrc: `${샐러드}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "샐러드 먹기",
      days: 0,
    },
    {
      className: "water",
      imgSrc: `${물}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "물 8컵 마시기",
      days: 0,
    },
    {
      className: "meditation",
      imgSrc: `${명상}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "명상하기",
      days: 0,
    },
    {
      className: "massage",
      imgSrc: `${마사지}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "마사지하기",
      days: 0,
    },
    {
      className: "fermentation",
      imgSrc: `${발효식품}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "발효식품 섭취하기",
      days: 0,
    },
    {
      className: "stretching",
      imgSrc: `${스트레칭}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "스트레칭 하기",
      days: 0,
    },
    {
      className: "nuts",
      imgSrc: `${견과류}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "견과류 섭취하기",
      days: 0,
    },
    {
      className: "eat",
      imgSrc: `${식사}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "아침 식사하기",
      days: 0,
    },
    {
      className: "protein",
      imgSrc: `${단백질}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "단백질 섭취하기",
      days: 0,
    },
  ]);

  const [todos, setTodos] = useState({});
  const { totalTodosCount, completed100Count, maxStreak } =
    calculateTodoStats(todos);

  const { weekCalendarList, currentDate, goToPreviousMonth, goToNextMonth } =
    useCalendar();
  const carouselRef = useRef(null);
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  useEffect(() => {
    const token = Cookies.get("csrftoken"); // 쿠키에서 CSRF 토큰을 가져옵니다.
    if (token) {
      // setCsrfToken(token); // 상태에 토큰을 설정합니다.
      axios.defaults.headers.common["X-CSRFToken"] = token; // Axios 헤더에 토큰을 설정합니다.
    }
  }, []);

  useEffect(() => {
    const fetchTodosAndCounts = async () => {
      try {
        const userId = localStorage.getItem("userid");
        const curDate = localStorage.getItem("loginat");

        // Fetch user todos
        const todosResponse = await axios.get(`${URL}/read-user-todo/`, {
          withCredentials: true,
          headers: { "X-User-Id": userId },
          params: { date: curDate },
        });

        // Fetch counts
        const countsResponse = await axios.get(`${URL}/calendar/cnt/all/`, {
          withCredentials: true,
          headers: { "X-User-Id": userId },
        });

        const userTodos = todosResponse.data.user_todo.length;
        const counts = countsResponse.data.data_count;

        // Process data to create todos object
        const processedTodos = counts.reduce((acc, { date, count }) => {
          const percentage = (count / userTodos) * 100;
          let status;
          if (percentage === 100) status = 100;
          else if (percentage >= 50) status = 50;
          else if (percentage >= 10) status = 10;
          else status = 0;
          acc[date] = status;
          return acc;
        }, {});

        setTodos(processedTodos);
      } catch (error) {
        console.error("Error fetching todos and counts:", error);
      }
    };

    fetchTodosAndCounts();
  }, []);

  return (
    <div className="Monthly-back">
      <div className="monthly-stat">
        <img src={느림이} alt="icon" />
        <section className="stat-header">
          <Calendar
            weekCalendarList={weekCalendarList}
            currentDate={currentDate}
            goToPreviousMonth={goToPreviousMonth}
            goToNextMonth={goToNextMonth}
            todos={todos}
          />

          <section className="legend">
            <span className="legend-item completed"></span> 100% 완료
            <span className="legend-item partial"></span> 50% 이상 완료
            <span className="legend-item little"></span> 10% 이상 완료
            <span className="legend-item ongoing"></span> 현재 진행 중 (오늘)
            <span className="legend-item none"></span> 아직 없음
          </section>

          <section className="legend-activity">
            <div className="legend-activity-card">
              <p>루틴 수행</p>
              <p2>저속노화 발걸음을 수행한 날</p2>
              <span>{totalTodosCount}</span>
            </div>
            <div className="legend-activity-card">
              <p>100% 달성</p>
              <p2>루틴 100% 달성한 날</p2>
              <span>{completed100Count}</span>
            </div>
            <div className="legend-activity-card">
              <p>최대 발걸음 연속일</p>
              <p2>모든 루틴을 수행한 날들의 연속</p2>
              <span>{maxStreak}</span>
            </div>
          </section>
        </section>

        <section className="activity-stat">
          <div className="activity-header">
            <img src={icon_1} alt="icon" />
            <h3>루틴 발걸음</h3>
            <span>매월 1일부터 오늘까지의 기록이 반영된 결과예요</span>
          </div>
        </section>

        <div className="activity-steps-container">
          <div className="activity-steps">
            <div className="activity-step">
              <div className="calendar-small fruit">
                <span>야채주스 마시기</span>
                <img src={과일} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="야채주스 마시기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small gym">
                <span>근력 운동하기</span>
                <img src={근력} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="근력 운동하기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small walk">
                <span>유산소 운동하기</span>
                <img src={산책} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="유산소 운동하기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small sleep">
                <span>7시간 이상 잠자기</span>
                <img src={취침} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="7시간 이상 잠자기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small noal">
                <span>목욕하기</span>
                <img src={목욕} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="목욕하기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small salad">
                <span>샐러드 먹기</span>
                <img src={샐러드} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="샐러드 먹기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small water">
                <span>물 8컵 마시기</span>
                <img src={물} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="물 8컵 마시기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small meditation">
                <span>명상하기</span>
                <img src={명상} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="명상하기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small massage">
                <span>마사지하기</span>
                <img src={마사지} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="마사지하기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small fastfood">
                <span>발효식품 섭취하기</span>
                <img src={발효식품} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="발효식품 섭취하기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small stretching">
                <span>스트레칭 하기</span>
                <img src={스트레칭} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="스트레칭 하기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small nuts">
                <span>견과류 섭취하기</span>
                <img src={견과류} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="견과류 섭취하기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small meal">
                <span>아침 식사하기</span>
                <img src={식사} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="아침 식사하기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
              <div className="calendar-small coffee">
                <span>단백질 섭취하기</span>
                <img src={단백질} alt="icon" />
                <SmallCalendar
                  weekCalendarList={weekCalendarList}
                  activityName="단백질 섭취하기"
                  userId={localStorage.getItem("userid")}
                  url={URL}
                />
              </div>
            </div>
          </div>
        </div>

        <section className="top-stat">
          <div className="top-header">
            <img src={icon_2} alt="icon" />
            <h3>
              이달의 <span>TOP 3</span>
            </h3>
            <p>매월 1일부터 오늘까지의 기록이 반영된 결과예요</p>
          </div>
        </section>

        <div className="top-activity-wrapper">
          <div className="top-activity">
            {topActivities
              .sort((a, b) => b.days - a.days)
              .slice(0, 3)
              .map((activity, index) => (
                <div
                  key={index}
                  className={`top-activity-card ${activity.className}`}
                >
                  <img src={activity.imgSrc} alt={activity.alt} />
                  <p>{activity.text}</p>
                  <span>{activity.days}일</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStat;
