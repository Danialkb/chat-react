import React, {memo, useEffect, useMemo, useState} from 'react';
import ChatList from "./components/chat-list/ChatList";
import "./Chat.css";
import {ChatService} from "./Chat.service";
import PrivateChat from "./components/private-chat/PrivateChat";
import MyButton from "../../UI/button/MyButton";
import {useNavigate} from "react-router-dom";

const Chat = () => {
    const [chatID, setChatID] = useState(null);
    const [chatParticipant, setParticipant] = useState({});

    const [user, setUser] = useState({});
    const chatService = useMemo(() => new ChatService(), []);
    const navigate = useNavigate();

    useEffect(() => {
        chatService.fetchUser().then((data) => setUser(data))
    }, [chatService]);

    const handleDataFromChild = (id, participant) => {
        setChatID(id);
        setParticipant(participant);
    };

    const displayPrivateChat = () => {
        if (chatID !== null) {
            return (
                <div className="chat-container">
                    <PrivateChat chatID={chatID} participant={chatParticipant}/>
                </div>
            )
        } else {
            return null;
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="parent-container">
            <div className="chat-list-container">
                <h1>{user.first_name} {user.last_name} {user.email}</h1>
                <MyButton onClick={logout}>Logout</MyButton>
                <ChatList onDataFromChild={handleDataFromChild}></ChatList>
            </div>
            {displayPrivateChat()}
        </div>
    );
};

export default memo(Chat);