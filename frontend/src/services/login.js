import axios from 'axios';
import { baseUrl } from '../lib/utils';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, { username, password });
    return response.data;
  } catch (error) {
    return null;
  }
};