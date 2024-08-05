import React, { useState } from "react";
import style from "./TodoBtn.module.css";

const TodoBtn = ({ img, text, onClick, isOn }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    onClick();
  };

  return (
    <div
      className={`${style.btnWrapper} ${clicked ? style.clicked : ""}`}
      onClick={handleClick}
    >
      {/* <button className={style.moreBtn} /> */}
      <img className={style.btnImg} src={img} />
      <span className={style.btnName}>{text}</span>
    </div>
  );
};

export default TodoBtn;
