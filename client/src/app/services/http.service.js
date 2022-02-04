import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configFile from "../config/config.json";
import { setTokens } from "../services/localStorage.service";

const axiosInstance = axios.create({
    baseURL: configFile.API_END_POINT,
    withCredentiials: true,
});

axiosInstance.interceptors.request.use(
    function (config) {
        config.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
            configFile.TOKEN_ACCESS_KEY
        )}`;
        config.headers.post["Content-Type"] = "application/json";
        config.headers.get["Content-Type"] = "application/json";

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

//  перехватчик, 1й аргумент  - положительный ответ, 2 - error(unexpected)
axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                // const { data } = await axios.get(
                //     `${configFile.API_END_POINT}auth/refresh`,
                //     { withCredentiials: true }
                // );
                const { data } = await axiosInstance.get(`auth/refresh`);
                setTokens(data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
                    configFile.TOKEN_ACCESS_KEY
                )}`;
                return axiosInstance.request(originalRequest);
            } catch (error) {
                console.log(error);
                toast.error("unauthorized user");
            }
        }
        const expectedErrors =
            error.response &&
            (error.response.status === 400 ||
                (error.response.status >= 402 && error.response.status < 500));
        if (!expectedErrors) {
            console.log(error);
            toast.error("some error happened");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axiosInstance.get,
    post: axiosInstance.post,
    put: axiosInstance.put,
    delete: axiosInstance.delete,
};

export default httpService;
