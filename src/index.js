import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import getCookie from "./components/getCookie.js";

const URL =
  "https://port-0-likelion-hackathon-lxmynpl6f586b2fd.sel5.cloudtype.app/csrf-token/";

// CSRF 토큰을 가져와서 Axios 설정
async function setupAxios() {
  try {
    const response = await axios.get(URL);
    const csrfToken = response.data.csrfToken;

    // Axios 기본 헤더 설정
    axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
}

// 애플리케이션 초기화 시에 호출합니다.
setupAxios();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
