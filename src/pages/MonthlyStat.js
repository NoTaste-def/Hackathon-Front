import React, { useRef } from "react";
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

import "./MonthlyStat.css";
import "./Monthly/top.css";
import "./Monthly/calendar_img.css";

const MonthlyStat = ({ csrfToken }) => {
  const todos = {
    "2024-07-30": 100,
    "2024-07-15": 50,
    "2024-07-01": 10,
  };

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

  const top = [
    {
      className: "fruit",
      imgSrc: `${과일}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "과일 섭취하기",
      days: 12,
    },
    {
      className: "muscle",
      imgSrc: `${근력}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "근력 운동하기",
      days: 11,
    },
    {
      className: "walk",
      imgSrc: `${산책}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "30분 산책하기",
      days: 9,
    },
    {
      className: "sleep",
      imgSrc: `${취침}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "7시간 이상 취침하기",
      days: 5,
    },
    {
      className: "bath",
      imgSrc: `${목욕}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "목욕하기",
      days: 8,
    },
    {
      className: "salad",
      imgSrc: `${샐러드}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "한 끼 샐러드 먹기",
      days: 9,
    },
    {
      className: "water",
      imgSrc: `${물}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "5분동안 명상하기",
      days: 8,
    },
    {
      className: "meditation",
      imgSrc: `${명상}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "5분동안 명상하기",
      days: 6,
    },
    {
      className: "massage",
      imgSrc: `${마사지}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "혈액순환 마사지하기",
      days: 7,
    },
    {
      className: "fermentation",
      imgSrc: `${발효식품}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "발효식품 먹기",
      days: 7,
    },
    {
      className: "stretching",
      imgSrc: `${스트레칭}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "스트레칭하기",
      days: 6,
    },
    {
      className: "nuts",
      imgSrc: `${견과류}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "견과류 섭취하기",
      days: 6,
    },
    {
      className: "eat",
      imgSrc: `${식사}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "하루 3끼 식사하기",
      days: 7,
    },
    {
      className: "protein",
      imgSrc: `${단백질}`, // 실제 이미지 경로로 대체
      alt: "icon",
      text: "단백질 먹기",
      days: 10,
    },
  ];

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
              <div className="calendar-small">
                <span>야채주스 마시기</span>
                <img src={과일} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small">
                <span>근력 운동하기</span>
                <img src={근력} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small">
                <span>30분 산책하기</span>
                <img src={산책} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small sleep">
                <span>7시간 이상 취침하기</span>
                <img src={취침} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small noal">
                <span>목욕하기</span>
                <img src={목욕} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small salad">
                <span>한 끼 샐러드 먹기</span>
                <img src={샐러드} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small water">
                <span>물 8컵 먹기</span>
                <img src={물} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small meditation">
                <span>5분동안 명상하기</span>
                <img src={명상} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small massage">
                <span>혈액순환 마사지하기</span>
                <img src={마사지} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small fastfood">
                <span>발효식품 먹기</span>
                <img src={발효식품} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small stretching">
                <span>스트레칭하기</span>
                <img src={스트레칭} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small nuts">
                <span>견과류 섭취하기</span>
                <img src={견과류} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small meal">
                <span>하루 3끼 식사하기</span>
                <img src={식사} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
              </div>
              <div className="calendar-small coffee">
                <span>단백질 먹기</span>
                <img src={단백질} alt="icon" />
                <SmallCalendar weekCalendarList={weekCalendarList} />
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

        <div className="top-activity">
          {top
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
  );
};

export default MonthlyStat;
