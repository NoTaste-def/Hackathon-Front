import React from "react";
import style from "./SelectionConfirmModal.module.css";
import CLOSE from "../image/btn/close.png";

const SelectionConfirmModal = ({ img, text }) => {
  return (
    <div className={style.bg}>
      <main className={style.confirmModal}>
        <nav className={style.btnNav}>
          <img src={CLOSE} className={style.closeBtn} />
        </nav>
        <img src={img} />
        <span>{text}</span>
        <span>항목에 체크하시겠어요?</span>
        <button>체크하기</button>
      </main>
    </div>
  );
};

export default SelectionConfirmModal;
