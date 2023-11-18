import React, {memo, useCallback, useEffect, useState} from 'react';
import {ChatService} from "../../Chat.service";
import {useNavigate} from "react-router-dom";
import "./ChatList.css";

const ChatList = ({onDataFromChild}) => {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    const chatService = useCallback(() => new ChatService(), []);

    useEffect(() => {
        const service = chatService();
        service.getChats().then((data) => setChats(data)).catch((error) => navigate("/login"))
    }, [chatService, navigate]);

    return (
        <div className="chat-list">
            <h2>Chats</h2>
            {chats.map((chat) => (
                <div className="chat-wrapper" key={chat.id}>
                    {chat.participants
                        .map((participant) => (
                            <div className="chat" onClick={() => onDataFromChild(chat.id, participant)}>
                                <h4 key={participant.id}>
                                    {participant.first_name} {participant.last_name}
                                </h4>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default memo(ChatList);