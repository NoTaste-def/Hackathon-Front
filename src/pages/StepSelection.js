import React, { useState } from "react";
import style from "./StepSelection.module.css";
import TodoBtn from "../components/TodoBtn";
import { Navigate, useNavigate } from "react-router";
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
import 발효식품 from "../image/btn/발표식품 먹기.png";
import 식사 from "../image/btn/아침 식사하기.png";
import 샐러드 from "../image/btn/샐러드 먹기.png";
import 생선 from "../image/btn/생선 먹기.png";
import SelectionConfirmModal from "../components/SelectionConfirmModal";

const URL =
  "https://port-0-thebeautyofslow-lxmynpl6f586b2fd.sel5.cloudtype.app/";

const data = [
  {
    name: "물 8컵 마시기",
    img: 물,
  },
  {
    name: "아침 식사하기",
    img: 식사,
  },
  {
    name: "샐러드 먹기",
    img: 샐러드,
  },
  {
    name: "견과류 먹기",
    img: 견과류,
  },
  {
    name: "생선 먹기",
    img: 생선,
  },
  {
    name: "야채주스 마시기",
    img: 야채주스,
  },
  {
    name: "발효식품 먹기",
    img: 발효식품,
  },
  {
    name: "단백질 먹기",
    img: 단백질,
  },
  {
    name: "유산소 운동하기",
    img: 유산소,
  },
  {
    name: "근력 운동하기",
    img: 근력,
  },
  {
    name: "스트레칭하기",
    img: 스트레칭,
  },
  {
    name: "명상하기",
    img: 명상,
  },
  {
    name: "목욕하기",
    img: 목욕,
  },
  {
    name: "7시간 이상 잠자기",
    img: 취침,
  },
  {
    name: "마사지 받기",
    img: null,
  },
];

// 미선택, 선택 리스트 조작

const StepSelection = ({ selec, setSelec }) => {
  const navigate = useNavigate();

  const handleClick = (name) => {
    setSelec((prev) => {
      if (prev.includes(name)) {
        // 이미 선택된 항목인 경우 제거
        const updated = prev.filter((item) => item !== name);
        console.log(name, "삭제");
        console.log(selec);
        return updated;
      } else {
        // 선택되지 않은 항목인 경우 추가
        const updated = [...prev, name];
        console.log(name, "추가");
        console.log(selec);
        return updated;
      }
    });
  };

  const toBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      // CSRF 토큰 가져오기
      const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

      const response = await axios.post(
        `${URL}save-user-todo/`,
        { user_todo: selec },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
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
          {data.map((now, i) => {
            return (
              <>
                <TodoBtn
                  key={i}
                  img={now.img}
                  text={now.name}
                  onClick={() => handleClick(now.name)}
                />
              </>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default StepSelection;
