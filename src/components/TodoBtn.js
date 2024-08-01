import React, { useState } from "react";
import style from "./TodoBtn.module.css";
import SelectionConfirmModal from "./SelectionConfirmModal";

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
      {isOn ? <SelectionConfirmModal /> : null}
    </div>
  );
};

export default TodoBtn;
