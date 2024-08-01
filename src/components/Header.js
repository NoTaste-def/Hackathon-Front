import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../image/logo.png";

const Header = ({
  openLoginModal,
  openSignupModal,
  isLoggedIn,
  handleLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav_bar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav_logo">
        <Link to="/">
          <img src={Logo} alt="BigCo Inc. logo" />
        </Link>
      </div>
      <ul className="nav_main">
        <li>
          <Link to="/steps">저속노화 발걸음</Link>
        </li>
        <li>
          <Link to="/monthly-stats">월간 통계</Link>
        </li>
      </ul>
      {isLoggedIn ? (
        <div className="nav_logout">
          <div className="logout" onClick={handleLogout}>
            로그아웃
          </div>
        </div>
      ) : (
        <div className="nav_login">
          <div className="login" onClick={openLoginModal}>
            로그인
          </div>
          <div className="signup" onClick={openSignupModal}>
            회원가입
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
