import React from "react";
import { Link } from "react-router-dom";
import Logo_2 from "../image/logo_footer.png";
import kakao from "../image/kakao.png";
import instagram from "../image/instagram.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-icon">
          <img src={Logo_2} alt="Footer Icon" />
        </div>
        <div className="footer-links">
          <Link to="/terms">이용약관</Link>
          <Link to="/privacy">개인정보처리방침</Link>
          <Link to="/guide">이용가이드</Link>
          <Link to="/about">ABOUT US</Link>
        </div>
        <div className="social-icons">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="Instagram" />
          </a>
          <a
            href="https://kakaotalk.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={kakao} alt="KakaoTalk" />
          </a>
        </div>
      </div>

      <div className="F_dump">
        <p className="address">
          찾아오시는 길 : 대전광역시 유성구 동서대로 125 한밭대학교
        </p>
        <p className="copyright">
          Copyright © 느림의 미학. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
