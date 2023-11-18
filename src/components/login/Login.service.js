import axios from "axios";

export const login = async (email, password) => {
    try {
        const response = await axios.post("/api/v1/users/token/", {
            "email": email,
            "password": password
        });
        localStorage.setItem("token", response.data["access"]);

        return response.status;
    } catch (error) {
        console.error("Error while registering user:", error);
        throw error;
    }
}