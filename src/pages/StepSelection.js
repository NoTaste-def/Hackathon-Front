import React, { useState, useEffect } from "react";
import style from "./StepSelection.module.css";
import TodoBtn from "../components/TodoBtn";
import { useNavigate } from "react-router";
import axios from "axios";

import 유산소 from "../image/btn/유산소 운동하기.png";
import 명상 from "../image/btn/명상하기.png";
import 취침 from "../image/btn/7시간 이상 잠자기.png";
import 견과류 from "../image/btn/견과류 먹기.png";
import 야채주스 from "../image/btn/야채주스 마시기.png";
import 근력 from "../image/btn/근력 운동하기.png";
import 목욕 from "../image/btn/목욕하기.png";
import 물 from "../image/btn/물 8컵 마시기.png";
import 스트레칭 from "../image/btn/스트레칭 하기.png";
import 단백질 from "../image/btn/단백질 먹기.png";
import 발효식품 from "../image/btn/발효식품 먹기.png";
import 식사 from "../image/btn/아침 식사하기.png";
import 샐러드 from "../image/btn/샐러드 먹기.png";
import 생선 from "../image/btn/생선 먹기.png";
import getCsrfToken from "../components/getCsrfToken";

const URL =
  "https://port-0-likelion-hackathon-lxmynpl6f586b2fd.sel5.cloudtype.app";

const data = [
  { name: "물 8컵 마시기", img: 물 },
  { name: "아침 식사하기", img: 식사 },
  { name: "샐러드 먹기", img: 샐러드 },
  { name: "견과류 먹기", img: 견과류 },
  { name: "생선 먹기", img: 생선 },
  { name: "야채주스 마시기", img: 야채주스 },
  { name: "발효식품 먹기", img: 발효식품 },
  { name: "단백질 먹기", img: 단백질 },
  { name: "유산소 운동하기", img: 유산소 },
  { name: "근력 운동하기", img: 근력 },
  { name: "스트레칭하기", img: 스트레칭 },
  { name: "명상하기", img: 명상 },
  { name: "목욕하기", img: 목욕 },
  { name: "7시간 이상 잠자기", img: 취침 },
  { name: "마사지 받기", img: null },
];

const StepSelection = ({ selec, setSelec }) => {
  const navigate = useNavigate();

  const handleClick = (name) => {
    setSelec((prev) => {
      if (prev.includes(name)) {
        console.log(name, "삭제");
        return prev.filter((item) => item !== name);
      } else {
        console.log(name, "추가");
        return [...prev, name];
      }
    });
  };

  const toBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      const csrfToken = await getCsrfToken();

      await axios.post(
        `${URL}/save-user-todo/`,
        { user_todo: selec },
        {
          withCredentials: true,
          headers: { "X-CSRFToken": csrfToken },
        }
      );
      console.log("Data saved successfully.");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className={style.flexWrapper}>
      <div className={style.selectionWrapper}>
        <nav className={style.navbar}>
          <button className={style.backBtn} onClick={toBack} />
          <button className={style.completionBtn} onClick={handleSubmit} />
        </nav>
        <aside className={style.noticeWrapper}>
          <div className={style.notice}>
            <span>저속노화 습관 항목 추가하기</span>
            <p>
              <span>{selec.length}개 </span>선택 중
            </p>
          </div>
        </aside>
        <main className={style.steps_control}>
          {data.map((now, i) => (
            <TodoBtn
              key={i}
              img={now.img}
              text={now.name}
              onClick={() => handleClick(now.name)}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default StepSelection;
