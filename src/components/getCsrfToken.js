import React from "react";
import axios from "axios";

const URL =
  "https://port-0-likelion-hackathon-lxmynpl6f586b2fd.sel5.cloudtype.app";

const getCsrfToken = async () => {
  const response = await axios.get(`${URL}/csrf-token/`); // CSRF 토큰을 요청하는 엔드포인트
  return response.data.csrfToken;
};

export default getCsrfToken;
