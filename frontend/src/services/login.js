import axios from 'axios';
import { baseUrl } from '../lib/utils';

export const login = async (phone, password) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, { phone, password });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const signup = async (name, phone, password) => {
    try {
        const response = await axios.post(`${baseUrl}/users`, { name, phone, password });
        return response.data;
    } catch (error) {
        return null;
    }
}