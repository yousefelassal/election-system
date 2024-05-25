import axios from 'axios';
import { baseUrl } from '../lib/utils';

export const voteFor = async (candidateId) => {
    try {
        const response = await axios.put(`${baseUrl}/voting/${candidateId}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const resetVotes = async () => {
    try {
        const response = await axios.delete(`${baseUrl}/voting/reset`);
        return response.data;
    } catch (error) {
        return error;
    }
};