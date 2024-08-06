import { useEffect, useRef, useState } from "react";
import EmptyBtn from "../components/EmptyBtn";
import PlusBtn from "../components/PlusBtn";
import CheckBtn from "../components/CheckBtn";
import style from "./Steps.module.css";
import axios from "axios";

const empty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const URL =
  "https://port-0-likelion-hackathon-lxmynpl6f586b2fd.sel5.cloudtype.app";

const Steps = ({ selec, csrfToken, setCsrfToken }) => {
  const init = () => {
    if (localStorage.getItem("complete_cnt") === null) {
      return 0;
    } else {
      return Number(localStorage.getItem("complete_cnt"));
    }
  };

  const [isOn, setIsOn] = useState(false);
  const [data, setData] = useState([]);
  const [completedTodos, setCompletedTodos] = useState(init);

  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const WeekDay = ["일", "월", "화", "수", "목", "금", "토", "일"];
  const week = WeekDay[today.getDay()];

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       const response = await axios.get(`${URL}/read-user-todo/`);
  //       setData(response.data);
  //       console.log(response.data);
  //       // 완료된 할일 개수 초기화
  //       const completedCount = response.data[0].user_todo.filter(
  //         (todo) => todo.completed
  //       ).length;
  //       setCompletedTodos(completedCount);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchTodos();
  // }, []);

  // useEffect(() => {
  //   const userId = localStorage.getItem("userid");

  //   axios
  //     .get(`${URL}/calendar/견과류 섭취하기/`, {
  //       withCredentials: true,
  //       headers: { "X-User-Id": userId },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    const curDate = localStorage.getItem("loginat");

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/read-user-todo/`, {
          withCredentials: true,
          headers: { "X-User-Id": userId },
          params: {
            date: curDate,
          },
        });

        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log("err", error);
      }
    };

    fetchData();
  }, []);

  const totalTodos = data.length > 0 ? data[0].user_todo.length : 0;

  return (
    <div className={style.flex_wrapper}>
      <div className={style.steps_wrapper}>
        <nav className={style.completion_state}>
          <span>
            {month}월 {date}일, {week}요일
          </span>
          <h2>
            {totalTodos}개 중 {completedTodos}개 완료
          </h2>
        </nav>
        <main className={style.steps_control}>
          {data &&
            data.length > 0 &&
            data[0].user_todo.map((item, index) => (
              <CheckBtn
                key={index}
                text={item}
                cnt={completedTodos}
                setCnt={setCompletedTodos}
              />
            ))}
          <PlusBtn />
          {empty.map((a, i) => (
            <EmptyBtn key={i} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Steps;
