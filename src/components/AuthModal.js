import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import getCsrfToken from "./getCsrfToken";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (type === "login") {
      setIsSubmitting(true);

      try {
        const response = await axios.post(
          `${URL}/login/`,
          {
            user_email: email,
            password: password,
          },
          {
            withCredentials: true,
            headers: { "X-CSRFToken": csrfToken, Accept: "application/json" },
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
        } = response.data;

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
      } catch (error) {
        alert("로그인 실패!");
        if (error.response) {
          console.error("서버 응답 오류:", error.response.data);
        } else {
          console.error("요청 오류:", error.message);
        }
        if (error.response && error.response.status === 403) {
          const newToken = await getCsrfToken();
          setCsrfToken(newToken);
        }
      } finally {
        setIsSubmitting(false);
      }
    } else if (type === "signup") {
      if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      setIsSubmitting(true);

      try {
        const response = await axios.post(`${URL}/register/`, {
          user_email: email,
          password: password,
          nickname: nickname,
        });
        alert("회원가입 성공!");
        handleSubmit();
      } catch (error) {
        alert("회원가입 실패!");
        if (error.response) {
          console.error("서버 응답 오류:", error.response.data);
        } else {
          console.error("요청 오류:", error.message);
        }
      } finally {
        setIsSubmitting(false);
      }
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
        <h2>{type === "login" ? "로그인" : "회원가입"}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {type === "signup" && (
            <>
              <div className="form-group">
                <label htmlFor="passwordConfirm">비밀번호 확인:</label>
                <input
                  type="password"
                  id="passwordConfirm"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="nickname">닉네임:</label>
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={handleNicknameChange}
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "처리 중..."
              : type === "login"
              ? "로그인"
              : "회원가입"}
          </button>
        </form>
        {type === "login" && (
          <p className="signup-prompt">
            아직 회원이 아니신가요?{" "}
            <span className="signup-link" onClick={openSignupModal}>
              회원가입
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["login", "signup"]).isRequired,
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
