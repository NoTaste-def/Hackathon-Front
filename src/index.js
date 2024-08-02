// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { fetchAndSetCsrfToken } from "./components/setupAxios.js";

// 초기화 시 CSRF 토큰을 설정합니다.
fetchAndSetCsrfToken().then(() => {
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
