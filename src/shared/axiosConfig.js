import axios from "axios";

function axiosInstance() {
    const axiosInstance = axios.create({});


    axiosInstance.interceptors.request.use(
        (config) => {

            const accessToken = localStorage.getItem('token'); // Replace with your token retrieval method


            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return axiosInstance;
}

export default axiosInstance;