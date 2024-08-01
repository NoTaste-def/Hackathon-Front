// src/api/auth.js
import axios from 'axios';

const API_BASE_URL = 'https://port-0-thebeautyofslow-lxmynpl6f586b2fd.sel5.cloudtype.app/'; // json-server URL

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
