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
import 마사지 from "../image/btn/마사지 하기.png";

const URL =
  "https://port-0-likelion-hackathon-lxmynpl6f586b2fd.sel5.cloudtype.app";

const initialData = [
  { name: "물 8컵 마시기", img: 물 },
  { name: "아침 식사하기", img: 식사 },
  { name: "샐러드 먹기", img: 샐러드 },
  { name: "견과류 섭취하기", img: 견과류 },
  { name: "생선 섭취하기", img: 생선 },
  { name: "야채주스 마시기", img: 야채주스 },
  { name: "발효식품 섭취하기", img: 발효식품 },
  { name: "단백질 섭취하기", img: 단백질 },
  { name: "유산소 운동하기", img: 유산소 },
  { name: "근력 운동하기", img: 근력 },
  { name: "스트레칭 하기", img: 스트레칭 },
  { name: "명상하기", img: 명상 },
  { name: "목욕하기", img: 목욕 },
  { name: "7시간 이상 잠자기", img: 취침 },
  { name: "마사지 하기", img: 마사지 },
];

const StepSelection = ({ selec, setSelec, csrfToken, setCsrfToken }) => {
  const [filteredData, setFilteredData] = useState(initialData);
  const navigate = useNavigate();

  const toSteps = () => {
    window.location.href = "/steps";
  };

  const toBack = () => {
    navigate(-1);
  };

  const handleClick = (name) => {
    setSelec((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userid");
      const curDate = localStorage.getItem("loginat");

      if (!userId) {
        throw new Error("User ID not found in local storage");
      }

      const response = await axios.post(
        `${URL}/save-user-todo/`,
        { user_todo: selec, date: curDate },
        {
          withCredentials: true,
          headers: {
            "X-User-Id": userId,
          },
        }
      );

      console.log("Data saved successfully:", response.data);

      toSteps();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userid");
        const curDate = localStorage.getItem("loginat");

        if (!userId) {
          throw new Error("User ID not found in local storage");
        }

        const response = await axios.get(
          `${URL}/read-user-todo/`,
          {
            withCredentials: true,
            headers: { "X-User-Id": userId },
          },
          {
            params: {
              date: curDate,
            },
          }
        );

        // Extract user_todo items from the response
        const userTodos = response.data.flatMap((item) => item.user_todo);

        // Filter out items from initialData that are present in userTodos
        const filtered = initialData.filter(
          (item) => !userTodos.includes(item.name)
        );

        setFilteredData(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (filteredData.length === 0) {
    return (
      <div className={style.allSelectedPageWrapper}>
        <span>
          모두 도전하시는군요!
          <br />더 추가할 항목이 없어요, 대단해요!
        </span>
        <button onClick={toBack}>돌아가기</button>
      </div>
    );
  }

  return (
    <div className={style.flexWrapper}>
      <div className={style.selectionWrapper}>
        <nav className={style.navbar}>
          <button className={style.backBtn} onClick={toBack} />
          <button
            className={style.completionBtn}
            onClick={() => {
              handleSubmit();
            }}
          />
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
          {filteredData.map((now, i) => (
            <TodoBtn
              key={i}
              img={now.img}
              text={now.name}
              onClick={() => {
                handleClick(now.name);
              }}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default StepSelection;
