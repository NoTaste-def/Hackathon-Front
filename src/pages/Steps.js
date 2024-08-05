import { useEffect, useState } from "react";
import EmptyBtn from "../components/EmptyBtn";
import PlusBtn from "../components/PlusBtn";
import TodoBtn from "../components/TodoBtn";
import style from "./Steps.module.css";
import axios from "axios";
import CheckBtn from "../components/CheckBtn";

const selected = [];
const empty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const URL =
  "https://port-0-likelion-hackathon-lxmynpl6f586b2fd.sel5.cloudtype.app";

const Steps = ({ selec, csrfToken, setCsrfToken }) => {
  const [isOn, setIsOn] = useState(false);
  const [data, setData] = useState();

  const handleClick = () => {
    setIsOn(true);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userid");

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/read-user-todo/`, {
          withCredentials: true,
          headers: { "X-User-Id": userId },
        });

        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log("err", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.flex_wrapper}>
      <div className={style.steps_wrapper}>
        <nav className={style.completion_state}>
          <span>7월 12일, 금요일</span>
          <h2>7개중 1개 완료</h2>
        </nav>
        <main className={style.steps_control}>
          {data &&
            data.length > 0 &&
            data[0].user_todo.map((item, index) => (
              <CheckBtn key={index} text={item} />
            ))}
          <PlusBtn />
          {empty.map((a, i) => {
            return <EmptyBtn />;
          })}
        </main>
      </div>
    </div>
  );
};

export default Steps;
