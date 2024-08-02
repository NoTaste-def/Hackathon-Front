import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import getCsrfToken from "./getCsrfToken";
import getCookie from "./getCookie";

const URL =
  "https://port-0-likelion-hackathon-lxmynpl6f586b2fd.sel5.cloudtype.app";

const AuthModal = ({
  isOpen,
  onClose,
  type,
  password,
  passwordConfirm,
  email,
  nickname,
  error,
  handlePasswordChange,
  handlePasswordConfirmChange,
  handleEmailChange,
  handleNicknameChange,
  handleSubmit,
  openSignupModal,
  csrfToken,
  setCsrfToken,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // 추가된 상태

  if (!isOpen) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (type === "login") {
        const response = await axios.post(
          `${URL}/login/`,
          { user_email: email, password: password },
          {
            withCredentials: true,
          }
        );

        const {
          badges,
          level,
          login_at,
          message,
          nickname,
          title,
          user_email,
          csrfToken, // 서버 응답에서 CSRF 토큰을 받아옵니다.
        } = response.data;

        // 로그인 성공 후 CSRF 토큰을 업데이트합니다.
        axios.defaults.headers.common["X-CSRFToken"] = csrfToken;

        alert("로그인 성공!");

        handleSubmit({
          badges,
          level,
          login_at,
          message,
          nickname,
          title,
          user_email,
        });
      } else if (type === "signup") {
        if (password !== passwordConfirm) {
          alert("비밀번호가 일치하지 않습니다.");
          return;
        }

        await axios.post(
          `${URL}/register/`,
          { user_email: email, password: password, nickname: nickname },
          {
            withCredentials: true,
          }
        );

        alert("회원가입 성공!");
        handleSubmit();
      }
    } catch (error) {
      alert(type === "login" ? "로그인 실패!" : "회원가입 실패!");
      console.error("요청 오류:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={type === "login" ? "modal-overlay" : "SignUp_modal-overlay"}
    >
      <div className={type === "login" ? "modal" : "SignUp_modal"}>
        <button
          className={type === "login" ? "close-button" : "SignUp_close-button"}
          onClick={onClose}
        >
          x
        </button>
        <h2>{type === "login" ? "회원 로그인" : "회원가입"}</h2>
        <form onSubmit={handleFormSubmit} className="form_container">
          {type === "login" && (
            <>
              <div className="Login_Container">아이디</div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일 주소 입력"
                className="Login_font"
              />

              <div className="Login_Container">비밀번호</div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="영문,숫자 조합 15자 이내 비밀번호"
                maxLength={15}
                className="Login_font"
              />
              <span className="char_count pw login">{password.length}/15</span>
            </>
          )}
          {type === "signup" && (
            <>
              <div className="Login_Container">아이디</div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일 주소 입력"
                className="Login_font"
              />

              <div className="Login_Container">비밀번호</div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호 입력"
                maxLength={15}
                className="Login_font"
              />
              <span className="char_count pw signup">{password.length}/15</span>

              <div className="Login_Container">비밀번호 확인</div>
              <input
                type="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                placeholder="비밀번호 확인 입력"
                maxLength={15}
                className="Login_font"
              />
              <span className="char_count check signup">
                {passwordConfirm.length}/15
              </span>

              <div className="Login_Container">닉네임 설정</div>
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="사용할 닉네임 설정"
                maxLength={8}
                className="Login_font"
              />
              <span className="char_count nick signup">
                {nickname.length}/8
              </span>
            </>
          )}

          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            className={`login_button ${type === "login" ? "L1" : "L3"}`}
            disabled={isSubmitting}
          >
            {type === "login" ? "로그인하기" : "가입하기"}
          </button>
          {type === "login" && (
            <button
              type="button"
              className="login_button L2"
              onClick={() => {
                onClose();
                openSignupModal();
              }}
            >
              회원가입
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string,
  email: PropTypes.string.isRequired,
  nickname: PropTypes.string,
  error: PropTypes.string,
  handlePasswordChange: PropTypes.func.isRequired,
  handlePasswordConfirmChange: PropTypes.func,
  handleEmailChange: PropTypes.func.isRequired,
  handleNicknameChange: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  openSignupModal: PropTypes.func,
  csrfToken: PropTypes.string,
  setCsrfToken: PropTypes.func,
};

export default AuthModal;
