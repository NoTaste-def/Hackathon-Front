import React, { useState, useEffect } from "react";
import style from "./CheckBtn.module.css";
import SelectionConfirmModal from "./SelectionConfirmModal";

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

const imgData = [
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

const CheckBtn = ({ text, cnt, setCnt }) => {
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Load the checked status from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem(`checked-${text}`);
    setChecked(savedStatus === "true");
  }, [text]);

  // Save the checked status to localStorage
  useEffect(() => {
    localStorage.setItem(`checked-${text}`, checked);
  }, [checked, text]);

  // Find the image based on the text
  const img = imgData.find((item) => item.name === text)?.img || null;

  const handleClick = () => {
    if (!checked) {
      setShowModal(true);
    }
  };

  const handleComplete = () => {
    setChecked(true);
    setShowModal(false);
    // localStorage.setItem("completed");
  };

  const handleModalClose = () => {
    setChecked(false);
    setShowModal(false);
  };

  return (
    <div
      className={`${style.btnWrapper} ${checked ? style.checked : ""}`}
      onClick={handleClick}
    >
      {img && <img className={style.btnImg} src={img} alt={text} />}
      <span className={style.btnName}>{text}</span>
      {showModal && (
        <SelectionConfirmModal
          img={img}
          text={text}
          onComplete={handleComplete}
          onClose={handleModalClose}
          cnt={cnt}
          setCnt={setCnt}
        />
      )}
    </div>
  );
};

export default CheckBtn;
