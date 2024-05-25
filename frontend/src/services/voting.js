import axios from 'axios';
import { baseUrl } from '../lib/utils';

export const voteFor = async (id, token) => {
    try {
        const response = await axios.put(`${baseUrl}/voting/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const resetVotes = async (token) => {
    try {
        const response = await axios.delete(`${baseUrl}/voting/reset`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
};