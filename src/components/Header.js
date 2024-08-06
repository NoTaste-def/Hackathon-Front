import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../image/logo.png";

const Header = ({
  openLoginModal,
  openSignupModal,
  isLoggedIn,
  handleLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if the user is logged in and has a userid in localStorage
  const showLogoutButton = localStorage.getItem("userid");

  const handleLinkClick = (e, path) => {
    if (!localStorage.getItem("userid")) {
      e.preventDefault();
      alert("로그인 이후 이용하실 수 있습니다.");
    }
  };

  return (
    <header className={`nav_bar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav_logo">
        <Link to="/">
          <img src={Logo} alt="BigCo Inc. logo" />
        </Link>
      </div>
      <ul className="nav_main">
        <li>
          <Link to="/steps" onClick={(e) => handleLinkClick(e, "/steps")}>
            저속노화 발걸음
          </Link>
        </li>
        <li>
          <Link
            to="/monthly-stats"
            onClick={(e) => handleLinkClick(e, "/monthly-stats")}
          >
            월간 통계
          </Link>
        </li>
      </ul>
      {showLogoutButton ? (
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
