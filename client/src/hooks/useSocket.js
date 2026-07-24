import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SOCKET_URL = 'http://localhost:5001';

export const useSocket = () => {
    const { user } = useAuthStore();
    const { setOnlineUsers, addMessage } = useChatStore();
    const socketRef = useRef(null);

    useEffect(() => {
        if(!user) return;

        socketRef.current = io(SOCKET_URL, {
            query: { userId: user.id },
        });

        socketRef.current.on('getOnlineUsers', (users) => {
            setOnlineUsers(users);
        });

        socketRef.current.on('newMessage', (message) => {
            addMessage(message);
        });

        return () => {
            socketRef.current.disconnect();
        };

    }, [user]);

    return socketRef.current;
};