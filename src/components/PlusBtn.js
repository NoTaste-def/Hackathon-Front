import React, { useState } from "react";
import style from "./PlusBtn.module.css";
import PLUS from "../image/btn/plus.png";
import { Navigate, useNavigate } from "react-router";

const PlusBtn = () => {
  const navigate = useNavigate();
  const toSelection = () => {
    navigate("/step-selection");
  };

  return (
    <div className={style.btnWrapper} onClick={toSelection}>
      <img className={style.plusBtn} src={PLUS} />
    </div>
  );
};

export default PlusBtn;
