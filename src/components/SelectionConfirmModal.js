import React from "react";
import style from "./SelectionConfirmModal.module.css";
import CLOSE from "../image/btn/close.png";
import axios from "axios";

const URL =
  "https://port-0-likelion-hackathon-lxmynpl6f586b2fd.sel5.cloudtype.app";

const SelectionConfirmModal = ({
  img,
  text,
  onComplete,
  onClose,
  showModal,
  setShowModal,
}) => {
  const userId = localStorage.getItem("userid");
  const login_at = localStorage.getItem("loginat");

  const handleComplete = () => {
    axios
      .post(
        `${URL}/complete/`,
        {
          date: login_at,
          item: text,
        },
        {
          withCredentials: true,
          headers: {
            "X-User-Id": userId,
          },
        }
      )
      .then((res) => {
        if (res) {
          onComplete(); // Notify CheckBtn to update its state
        }
      })
      .catch((error) => {
        console.error("Error completing the task", error);
      });
  };

  return (
    <div className={style.bg}>
      <main className={style.confirmModal}>
        <nav className={style.btnNav}>
          <img
            src={CLOSE}
            className={style.closeBtn}
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 버블링으로 인해 모달 안닫히는 문제 수정
              onClose();
            }}
            alt="Close"
          />
        </nav>
        <img src={img} alt={text} />
        <span>{text}</span>
        <span>항목에 체크하시겠어요?</span>
        <button onClick={handleComplete}>체크하기</button>
      </main>
    </div>
  );
};

export default SelectionConfirmModal;
