import React, {memo} from 'react';
import "./Message.css";

const Message = ({user, message}) => {

    const generateDate = (date) => {
        const datetime = new Date(message.timestamp);
        const year = datetime.getFullYear();
        const month = datetime.getMonth() + 1;
        const day = datetime.getDate();
        const hours = datetime.getHours();
        const minutes = datetime.getMinutes();

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        return `${formattedTime} ${formattedDate}`;
    }

    return (
        <div className={`message-container ${user ? "sent-message" : "accepted-message"}`}>
            <div>
                <h5 className="message-username">
                    {user ? `${user.first_name} ${user.last_name}` : "You"}
                </h5>
                <p>{message.content}</p>
                <p className="message-time">{generateDate(message.timestamp)}</p>
            </div>
        </div>
    );
};

export default memo(Message);