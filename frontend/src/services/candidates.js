import axios from 'axios';
import { baseUrl } from '../lib/utils';

export const getCandidates = async () => {
    try {
        const response = await axios.get(`${baseUrl}/candidates`);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const addCandidate = async (name, party, image, token) => {
    try {
        const response = await axios.post(`${baseUrl}/candidates`, { name, party, image }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

export const deleteCandidate = async (id, token) => {
    try {
        const response = await axios.delete(`${baseUrl}/candidates/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

export const updateCandidate = async (id, name, party, image, token) => {
    try {
        const response = await axios.put(`${baseUrl}/candidates/${id}`, { name, party, image }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
};