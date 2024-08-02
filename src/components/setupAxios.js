import axios from "axios";

// CSRF 토큰을 Axios의 기본 헤더에 설정하는 함수
export async function setCsrfToken(csrfToken) {
  axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
}

// CSRF 토큰을 요청하고 설정하는 함수
export async function fetchAndSetCsrfToken() {
  try {
    const response = await axios.get(
      "https://port-0-likelion-hackathon-lxmynpl6f586b2fd.sel5.cloudtype.app/csrf-token/"
    );
    const csrfToken = response.data.csrfToken;
    setCsrfToken(csrfToken);
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
}
