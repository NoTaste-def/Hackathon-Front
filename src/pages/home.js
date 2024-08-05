import React, { useState, useEffect } from "react";
import Vector from "../image/vector_1.png";
import Vector2 from "../image/vector_2.png";
import 느림메인 from "../image/느림이_테마.png";
import 느림1 from "../image/느림이2.png";
import 느림2 from "../image/느림이1.png";

const Home = ({ openLoginModal, isLoggedIn, userProfile }) => {
  // 로컬 저장소에서 userId를 가져옵니다.

  return (
    <div className="home">
      <img src={느림메인} alt="slowness main Logo" className="slowness_Theme" />

      {localStorage.getItem("userid") ? (
        <section className="profile_section">
          <span>{localStorage.getItem("nick")}</span>님, 오늘도 반가워요!
          <div className="profile_card">
            <div className="profile_item">
              <h3>저속노화 레벨</h3>
              <p className="profile_value">
                LEVEL <span>{localStorage.getItem("level")}</span>
              </p>
            </div>
            <div className="profile_item">
              <h3>기록 배지</h3>
              <p className="profile_value">
                배지 {localStorage.getItem("badge")}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="login_section">
          <p className="login_message">
            저속노화
            <span className="font_light1">
              로 건강한 삶을 오래 유지하고 싶으신가요?
            </span>
          </p>
          <p className="login_message2">
            <span>느림의 미학</span>과 함께라면 어렵지 않아요!
          </p>
          <button className="login_button login" onClick={openLoginModal}>
            시작하기
          </button>
        </section>
      )}

      <section className="description_section">
        <h2>저속노화가 무엇인가요?</h2>
        <p>
          노화 과정을 천천히 진행시키고, 가능한 한 건강하게 나이를 먹도록
          <br />
          도와주는 생활습관과 방법들을 실천하는 것입니다
        </p>
      </section>

      <section className="features_section">
        <h2>느림의 미학에서 함께할 수 있어요</h2>
        <div className="features">
          <div className="feature">
            <div className="feature_header">
              <p>1</p>
            </div>
            <p>
              <span className="font_light1">
                저속노화를 향한 일상 속 루틴 만들기
              </span>
            </p>
            <p>저속노화 습관 발걸음</p>
          </div>
          <div className="wrapper">
            <img src={Vector} alt="Vector 이미지" className="vector" />
            <img src={느림1} alt="느림1 이미지" className="absolute-img1" />
          </div>
          <div className="wrapper">
            <img src={Vector2} alt="Vector2 이미지" className="vector2" />
            <img src={느림2} alt="느림2 이미지" className="absolute-img2" />
          </div>
          <div className="feature">
            <div className="feature_header">
              <p>2</p>
            </div>
            <p>
              <span className="font_light1">
                한 달 동안의 발걸음 한 눈에 보기
              </span>
            </p>
            <p>월간 통계</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
