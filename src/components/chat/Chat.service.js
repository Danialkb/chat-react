import axiosInstance from "../../shared/axiosConfig";

export class ChatService {
    constructor() {
        this.chatsEndpoint = "/api/v1/chat";
        this.messagesEndpoint = "/api/v1/message/";
    }

    async getChats() {
        try {
            const response = await axiosInstance().get(this.chatsEndpoint);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async getMessages(chatID) {
        try {
            const response = await axiosInstance().get(`${this.chatsEndpoint}/${chatID}/get_messages`);
            console.log(response.data);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async sendMessage(chatID, message) {
        try {
            const response = await axiosInstance().post(`${this.messagesEndpoint}`, {
                "chat": Number(chatID),
                "content": message,
            });
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async fetchUser() {
        const response = await axiosInstance().get("/api/v1/users/user/");
        return response.data;
    }

}