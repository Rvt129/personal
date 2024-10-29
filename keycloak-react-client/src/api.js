// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Thay thế bằng URL của bạn

export const fetchUserData = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data', error);
        throw error;
    }
};

export const fetchTransactions = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/transactions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions', error);
        throw error;
    }
};
