import axios from 'axios';
import { baseUrl } from '../lib/utils';

export const getStats = async () => {
    try {
        const response = await axios.get(`${baseUrl}/stats`);
        return response.data;
    } catch (error) {
        return null;
    }
};