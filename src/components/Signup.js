import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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
  openSignupModal
}) => {
  if (!isOpen) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (type === 'login') {
      if (validateForm_Login()) {
        try {
          const response = await axios.post('https://port-0-thebeautyofslow-lxmynpl6f586b2fd.sel5.cloudtype.app/login/', {
            user_email: email,
            password: password
          });

          // 서버 응답 데이터 추출
          const { badges, level, login_at, message, nickname, title, user_email } = response.data;

          // 로그인 성공 알림
          alert(`${nickname}님 환영합니다`);

          // 상태를 부모 컴포넌트에 전달
          handleSubmit({
            badges,
            level,
            login_at,
            message,
            nickname,
            title,
            user_email
          });

          // 로그인 모달 닫기
          onClose();
        } catch (error) {
          alert('로그인 실패!');
          console.error('로그인 오류:', error);
        }
      }
    } else if (type === 'signup') {
      if (validateForm_Signup()) {
        try {
          await axios.post('https://port-0-thebeautyofslow-lxmynpl6f586b2fd.sel5.cloudtype.app/register/', {
            user_email: email,
            password: password,
            nickname: nickname
          });
          alert('회원가입 성공!');
          handleSubmit();
        } catch (error) {
          alert('회원가입 실패!');
          console.error('회원가입 오류:', error);
        }
      }
    }
  };

  const validateForm_Login = () => {
    if (password.length < 5 || password.length > 10) {
      alert('비밀번호는 5글자 이상 10글자 이하로 입력해주세요.');
      return false;
    }
    return true;
  };

  const validateForm_Signup = () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return false;
    }
    if (password.length < 5 || password.length > 10) {
      alert('비밀번호는 5글자 이상 10글자 이하로 입력해주세요.');
      return false;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }
    if (nickname.length < 2) {
      alert('닉네임은 2글자 이상이어야 합니다.');
      return false;
    }
    return true;
  };

  return (
    <div className={type === 'login' ? 'modal-overlay' : 'SignUp_modal-overlay'}>
      <div className={type === 'login' ? 'modal' : 'SignUp_modal'}>
        <button className={type === 'login' ? 'close-button' : 'SignUp_close-button'} onClick={onClose}>x</button>
        <h2>{type === 'login' ? '회원 로그인' : '회원가입'}</h2>
        <form onSubmit={handleFormSubmit} className='form_container'>
          {type === 'login' && (
            <>
              <div className='Login_Container'>아이디</div>
              <input
                type='email'
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일 주소 입력"
                className='Login_font'
              />

              <div className='Login_Container'>비밀번호</div>
              <input
                type='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder="영문,숫자 조합 10자 이내 비밀번호"
                maxLength={15}
                className='Login_font'
              />
              <span className='char_count pw login'>{password.length}/15</span>
            </>
          )}
          {type === 'signup' && (
            <>
              <div className='Login_Container'>아이디</div>
              <input
                type='email'
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일 주소 입력"
                className='Login_font'
              />

              <div className='Login_Container'>비밀번호</div>
              <input
                type='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호 입력"
                maxLength={15}
                className='Login_font'
              />
              <span className='char_count pw signup'>{password.length}/15</span>

              <div className='Login_Container'>비밀번호 확인</div>
              <input
                type='password'
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                placeholder="비밀번호 확인 입력"
                maxLength={15}
                className='Login_font'
              />
              <span className='char_count check signup'>{passwordConfirm.length}/15</span>

              <div className='Login_Container'>닉네임 설정</div>
              <input
                type='text'
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="사용할 닉네임 설정"
                maxLength={8}
                className='Login_font'
              />
              <span className='char_count nick signup'>{nickname.length}/8</span>
            </>
          )}

          {error && <p className='error-message'>{error}</p>}
          <button type='submit' className={`login_button ${type === 'login' ? 'L1' : 'L3'}`}>
            {type === 'login' ? '로그인하기' : '가입하기'}
          </button>
          {type === 'login' && (
            <button type='button' className='login_button L2' onClick={() => { 
              onClose(); 
              openSignupModal(); 
            }}>
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
  openSignupModal: PropTypes.func
};

export default AuthModal;
