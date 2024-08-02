import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import getCookie from "./components/getCookie.js";

// CSRF 토큰을 가져오고 Axios 기본 설정을 적용하는 함수
async function setupAxios() {
  const csrfToken = await getCookie("csrftoken");
  axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
  axios.defaults.withCredentials = true; // 쿠키를 포함한 요청을 보낼 수 있게 설정
}

// 애플리케이션 초기화 시 CSRF 설정을 적용합니다.
setupAxios().then(() => {
  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
