import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    initializeAuth: () => {
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            set({ user: JSON.parse(storedUser) });
        }
    },

    signup: async (formData) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.post('/auth/signup', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            set({ user: response.data.user, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Signup failed', loading: false });
        }
    },

    login: async (formData) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.post('auth/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (error) {
            set({ error: error.response?.data?.message || 'Login failed', loading: false});
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null });
    },

}));