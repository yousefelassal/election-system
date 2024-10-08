import axios from 'axios';
import { baseUrl } from '../lib/utils';

export const enable2fa = async (userId, phone) => {
    try {
        const response = await axios.post(`${baseUrl}/users/enable-2fa`, { userId, phone });
        return response.data;
    } catch (error) {
        return null;
    }
}

export const verify2fa = async (userId, token) => {
    try {
        const response = await axios.post(`${baseUrl}/login/verify-2fa`, { userId, token });
        return response.data;
    } catch (error) {
        return null;
    }
}