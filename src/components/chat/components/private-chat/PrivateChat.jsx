import React, {memo, useCallback, useEffect, useState} from 'react';
import {ChatService} from "../../Chat.service";
import Message from "../../../Message/Message";
import MyInput from "../../../../UI/input/MyInput";
import "./PrivateChat.css";
import MyButton from "../../../../UI/button/MyButton";
import {useWS} from "../../hooks/wsHook";

const PrivateChat = ({chatID, participant}) => {
    const [messages, setMessages] = useState([]);
    const [msgContent, setMsgContent] = useState('');
    const chatService = useCallback(() => new ChatService(), []);

    useEffect(() => {
        const service = chatService();
        service.getMessages(chatID).then((data) => setMessages(data))
    }, [chatService, chatID, participant]);

    const chatSocket = useWS();

    chatSocket.onmessage = function(event) {
        const newMsg = JSON.parse(event.data);
        console.log(`Получено сообщение: ${newMsg}`);
        setMessages([newMsg.message, ...messages]);
    };

    const handleMsgInput  = (e) => {
        setMsgContent(e.target.value);
    }

    const handleButton = async (e) => {
        e.preventDefault();
        const service = chatService();
        const data = await service.sendMessage(chatID, msgContent);
        setMsgContent('');
        setMessages([data, ...messages]);
    }

    return (
        <div className="messages-container">
            <div className="chat-header">
                <h2>Private chat with {participant.first_name} {participant.last_name}</h2>
            </div>
            <div className="messages">
                {messages.map((message) => (
                    <div>
                        <Message
                            user={message.sender.id === participant.id ? message.sender : null}
                            message={message}/>
                    </div>
                ))}
            </div>
            <div className="send-msg">
                <MyInput
                    value={msgContent}
                    onChange={handleMsgInput}
                    classNames={["msg-input"]}
                    placeholder="Message"/>
                <MyButton onClick={handleButton} classNames={["msg-send-btn"]}>Send</MyButton>
            </div>

        </div>
    );
};

export default memo(PrivateChat);