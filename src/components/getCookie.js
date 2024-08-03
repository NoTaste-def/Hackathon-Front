function getCookie(name) {
  // 쿠키를 문자열로 가져옵니다.
  const cookies = document.cookie.split(";");

  // 요청한 쿠키 이름을 소문자로 변환합니다.
  const nameLower = name.toLowerCase();

  // 각 쿠키를 확인하여 필요한 이름의 값을 찾습니다.
  for (let cookie of cookies) {
    // 쿠키의 이름과 값은 '='으로 구분되어 있으므로 분리합니다.
    const [cookieName, cookieValue] = cookie.trim().split("=");

    // 쿠키 이름을 소문자로 변환하여 비교합니다.
    if (cookieName.toLowerCase() === nameLower) {
      return cookieValue || null; // 쿠키 값이 없으면 null을 반환합니다.
    }
  }

  // 쿠키를 찾지 못하면 null을 반환합니다.
  return null;
}

export default getCookie;
