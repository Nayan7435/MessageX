import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import { getMessages, sendMessage } from '../../../server/controllers/messageController';

export const useChatStore = create((set) => ({
    users: [],
    messages: [],
    selectedUser: null,
    onlineUsers: [],
    loading: false,

    setOnlineUsers: (users) => set({ onlineUsers: users }),

    selectedUser: (user) => set({ selectedUser: user, messages: [] }),

    addMessage: (message) =>
        set((state) => ({ message: [...state.messages, message] })),

    getUsers: async () => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get('/messages/users');
            set({ users: response.data.users, loading: false });
        } catch (error) {
            console.error(error);
            set({ loading: false });
        }
    },

    getMessages: async (userId) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: response.data.messages, loading: false });
        } catch (error) {
            console.error(error);
            set({ loading: false });
        }
    },

    sendMessage: async (receiverId, message) => {
        try {
            const response = await axiosInstance.post(`/messages/send/${receiverId}`, { message });
            set((state) => ({ messages: [...state.messages, response.data.message] }));
        } catch (error) {
            console.error(error);
        }
    },
}));