import { useEffect, useState } from "react";
import EmptyBtn from "../components/EmptyBtn";
import PlusBtn from "../components/PlusBtn";
import TodoBtn from "../components/TodoBtn";
import style from "./Steps.module.css";
import axios from "axios";
import getCookie from "../components/getCookie";

// 빈칸을 나타낼 리스트, 이미 선택된 항목에 대한 리스트를 적절히 활용.
// 선택 항목 리스트
// PlusBtn
// 빈칸 리스트
// 의 순서로 배치하여 map 함수를 적절히 활용.
// 배열의 값만 바꿔주는 것으로 결과가 쉽게 바뀜.

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
    axios
      .get(`${URL}/read-user-todo/`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => {
        console.log("err", e);
      });
  }, []);

  return (
    <div className={style.flex_wrapper}>
      <div className={style.steps_wrapper}>
        <nav className={style.completion_state}>
          <span>7월 12일, 금요일</span>
          <h2>7개중 1개 완료</h2>
        </nav>
        <main className={style.steps_control}>
          {selec.map((a, i) => {
            return <TodoBtn />;
          })}
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
